'use client';

import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Select, Input, Spin } from 'antd';
import { FaHeart, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { ProductService } from '@/services/api';
import SearchResultItem from '../SearchResultItem/SearchResultItem';
import styles from './MainHeader.module.css';

const { Option } = Select;

const MainHeader = () => {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState([]);
    const { cartItems = [], cartTotal = 0 } = useCart() || {};
    const { wishlistItems = [] } = useWishlist() || {};
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);

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

    const handleClickOutside = () => {
        setTimeout(() => {
            setShowResults(false);
        }, 200);
    };

    const formatCategoryName = (category) => {
        return category
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Row justify="space-between" align="middle">
                    <Col span={4}>
                        <div className={styles.headerLogo}>
                            <a href="/" className={styles.logo}>
                                <img src="/logo.svg" alt="E-commerce Logo" />
                            </a>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className={styles.headerSearch}>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleSearch();
                            }}>
                                <div className={`${styles.searchContainer} ${showResults && (searchResults.length > 0 || isSearching) ? styles.showResults : ''}`}>
                                    <div className={styles.searchInputs}>
                                        <Select
                                            value={selectedCategory}
                                            onChange={handleCategoryChange}
                                            className={styles.inputSelect}
                                            dropdownMatchSelectWidth={false}
                                        >
                                            <Option value="all">Todas Categorias</Option>
                                            {categories.map(category => (
                                                <Option key={category} value={category}>
                                                    {formatCategoryName(category)}
                                                </Option>
                                            ))}
                                        </Select>
                                        <Input
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Buscar produtos"
                                            className={styles.input}
                                            onBlur={handleClickOutside}
                                        />
                                        <Button
                                            className={styles.searchBtn}
                                            icon={<FaSearch />}
                                            onClick={handleSearch}
                                            type="primary"
                                        />
                                    </div>
                                    {showResults && (searchResults.length > 0 || isSearching) && (
                                        <div className={styles.resultsDropdown}>
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
                                                        >
                                                            Ver todos os resultados
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
                    <Col span={8}>
                        <div className={styles.headerCtn}>
                            <a href="/wishlist" className={styles.wishlist}>
                                <FaHeart />
                                <span>Lista de Desejos</span>
                                <div className={styles.qty}>{wishlistItems.length}</div>
                            </a>
                            <a href="/cart" className={styles.cartLink}>
                                <FaShoppingCart />
                                <span>Seu Carrinho</span>
                                <div className={styles.qty}>{cartItems.length}</div>
                            </a>
                        </div>
                    </Col>
                </Row>
            </div>
        </header>
    );
};

export default MainHeader;
