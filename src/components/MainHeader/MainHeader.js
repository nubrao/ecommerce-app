'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Button, Select, Input, Spin } from 'antd';
import { FaHeart, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { ProductService } from '@/services/api';
import SearchResultItem from '../SearchResultItem/SearchResultItem';
import WishlistDropdown from '../WishlistDropdown/WishlistDropdown';
import CartDropdown from '../CartDropdown/CartDropdown';
import styles from './MainHeader.module.css';

const { Option } = Select;

const MainHeader = () => {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const { cartItems = [] } = useCart() || {};
    const { wishlistItems = [] } = useWishlist() || {};
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [showWishlist, setShowWishlist] = useState(false);
    const [showCart, setShowCart] = useState(false);

    const closeAllDropdowns = useCallback(() => {
        setShowWishlist(false);
        setShowCart(false);
        setShowResults(false);
    }, []);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.trim()) {
                setIsSearching(true);
                try {
                    const results = await ProductService.search({
                        query: searchQuery,
                        category: selectedCategory,
                        limit: 5
                    });
                    setSearchResults(results.data);
                    setShowResults(true);
                } catch (error) {
                    console.error('Error searching products:', error);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setSearchResults([]);
                setShowResults(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery, selectedCategory]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const header = document.querySelector(`.${styles.header}`);
            const target = event.target;

            const isWishlistClick = target.closest(`.${styles.wishlistContainer}`);
            const isCartClick = target.closest(`.${styles.cartContainer}`);
            const isSearchClick = target.closest(`.${styles.searchContainer}`);

            if (header && !header.contains(target) && !isWishlistClick && !isCartClick && !isSearchClick) {
                closeAllDropdowns();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [closeAllDropdowns]);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const fetchCategories = async () => {
        try {
            const categoriesData = await ProductService.getCategories();
            setCategories(categoriesData);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
    };

    const handleSearch = () => {
        if (!searchQuery.trim() && selectedCategory === 'all') {
            return;
        }

        const queryParams = new URLSearchParams();

        if (searchQuery.trim()) {
            queryParams.append('q', searchQuery.trim());
        }

        if (selectedCategory !== 'all') {
            queryParams.append('category', selectedCategory);
        }

        const searchPath = `/search?${queryParams.toString()}`;
        router.push(searchPath);
    };

    const formatCategoryName = (category) => {
        if (!category || typeof category !== 'string') return '';

        return category.id ? category.name : category
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const handleWishlistClick = (e) => {
        e.preventDefault();
        setShowCart(false);
        setShowResults(false);
        setShowWishlist(!showWishlist);
    };

    const handleWishlistClose = () => {
        setShowWishlist(false);
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowWishlist(false);
        setShowResults(false);
        setShowCart(!showCart);
    };

    const handleCartClose = () => {
        setShowCart(false);
    };

    return (
        <header className={styles.header} role="banner">
            <div className={styles.container}>
                <Row justify="space-between" align="middle">
                    <Col xs={4} sm={4} md={4} lg={4}>
                        <div className={styles.headerLogo}>
                            <a href="/" className={styles.logo} aria-label="Go to homepage">
                                <img src="/logo.svg" alt="E-commerce Logo" />
                            </a>
                        </div>
                    </Col>
                    <Col xs={20} sm={20} md={12} lg={12}>
                        <div className={styles.headerSearch} role="search">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleSearch();
                            }}>
                                <div className={`${styles.searchContainer} ${showResults && (searchResults.length > 0 || isSearching) ? styles.showResults : ''}`}>
                                    <div className={styles.searchInputs}>
                                        {!isMobile && (
                                            <Select
                                                value={selectedCategory}
                                                onChange={handleCategoryChange}
                                                className={styles.inputSelect}
                                                popupMatchSelectWidth={false}
                                                aria-label="Select category"
                                            >
                                                <Option value="all">All Categories</Option>
                                                {categories.map(category => (
                                                    <Option
                                                        key={category.id}
                                                        value={category.id}
                                                        aria-label={category.name}
                                                    >
                                                        {category.name}
                                                    </Option>
                                                ))}
                                            </Select>
                                        )}
                                        <Input
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search products"
                                            className={styles.input}
                                            onBlur={() => setTimeout(() => setShowResults(false), 200)}
                                            aria-label="Search input"
                                        />
                                        <Button
                                            className={styles.searchBtn}
                                            icon={<FaSearch />}
                                            onClick={handleSearch}
                                            type="primary"
                                            aria-label="Search button"
                                        />
                                    </div>
                                    {showResults && (
                                        <div
                                            className={styles.resultsDropdown}
                                            role="listbox"
                                            aria-label="Search results"
                                        >
                                            {isSearching ? (
                                                <div className={styles.loadingContainer}>
                                                    <Spin size="small" />
                                                </div>
                                            ) : (
                                                <>
                                                    {searchResults.map((product) => (
                                                        <SearchResultItem
                                                            key={product.id}
                                                            product={product}
                                                        />
                                                    ))}
                                                    {searchResults.length > 0 && (
                                                        <div
                                                            className={styles.viewAllResults}
                                                            onClick={handleSearch}
                                                            role="button"
                                                            tabIndex={0}
                                                        >
                                                            View all results
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8}>
                        <div className={styles.headerCtn}>
                            <div className={styles.wishlistContainer}>
                                <a
                                    href="/wishlist"
                                    className={styles.wishlist}
                                    onClick={handleWishlistClick}
                                    aria-label={`Wishlist (${wishlistItems.length} items)`}
                                >
                                    <FaHeart />
                                    <span>Wishlist</span>
                                    <div className={styles.qty}>{wishlistItems.length}</div>
                                </a>
                                {showWishlist && (
                                    <WishlistDropdown
                                        onClose={handleWishlistClose}
                                        items={wishlistItems}
                                    />
                                )}
                            </div>
                            <div className={styles.cartContainer}>
                                <a
                                    href="/cart"
                                    className={styles.cartLink}
                                    onClick={handleCartClick}
                                    aria-label={`Shopping cart (${cartItems.length} items)`}
                                >
                                    <FaShoppingCart />
                                    <span>Your Cart</span>
                                    <div className={styles.qty}>{cartItems.length}</div>
                                </a>
                                {showCart && (
                                    <CartDropdown
                                        onClose={handleCartClose}
                                    />
                                )}
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </header>
    );
};

export default MainHeader;
