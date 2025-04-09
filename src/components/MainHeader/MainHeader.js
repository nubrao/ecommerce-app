import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Dropdown, Menu, Select, Input } from 'antd';
import { FaHeart, FaShoppingCart, FaBars, FaSearch, FaTimes, FaArrowCircleRight } from 'react-icons/fa';
import { ProductService } from '@/services/api';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import styles from './MainHeader.module.css';

const { Option } = Select;

const MainHeader = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('0');
    const [searchQuery, setSearchQuery] = useState('');
    const { cartItems, cartTotal } = useCart();
    const { wishlistItems } = useWishlist();

    const fetchProducts = async () => {
        try {
            let data;
            if (selectedCategory === '0') {
                data = await ProductService.getAll();
            } else {
                data = await ProductService.getByCategory(selectedCategory);
            }
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const data = await ProductService.getCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        fetchProducts();
    };

    const handleSearch = async () => {
        try {
            let searchResults;
            if (selectedCategory === '0') {
                const data = await ProductService.getAll();
                searchResults = data.filter((product) =>
                    product.title.toLowerCase().includes(searchQuery.toLowerCase())
                );
            } else {
                const data = await ProductService.getByCategory(selectedCategory);
                searchResults = data.filter((product) =>
                    product.title.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }
            setProducts(searchResults);
        } catch (error) {
            console.error('Error searching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [selectedCategory]);

    const cartMenuItems = {
        items: [
            {
                key: '1',
                label: (
                    <div className={styles.cartDropdown}>
                        <div className={styles.cartList}>
                            {cartItems.map((item) => (
                                <div key={item.id} className={styles.cartItem}>
                                    <img src={item.image} alt={item.name} />
                                    <div className={styles.cartItemDetails}>
                                        <span>{item.name}</span>
                                        <span>${item.price}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.cartTotal}>
                            <span>Total:</span>
                            <span>${cartTotal}</span>
                        </div>
                        <div className={styles.cartActions}>
                            <Button type="primary">Ver Carrinho</Button>
                            <Button>Checkout</Button>
                        </div>
                    </div>
                ),
            },
        ],
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
                                <Select
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                    className={styles.inputSelect}
                                    aria-label="Selecionar categoria"
                                >
                                    <Option value="0">Todas Categorias</Option>
                                    {categories.map((category, index) => (
                                        <Option key={index} value={category}>
                                            {category}
                                        </Option>
                                    ))}
                                </Select>
                                <Input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Buscar produtos"
                                    className={styles.input}
                                    aria-label="Campo de busca"
                                />
                                <Button
                                    className={styles.searchBtn}
                                    icon={<FaSearch />}
                                    onClick={handleSearch}
                                    aria-label="Buscar"
                                />
                            </form>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className={styles.headerCtn}>
                            <a href="/wishlist" className={styles.wishlist} aria-label="Lista de desejos">
                                <FaHeart />
                                <span>Lista de Desejos</span>
                                <div className={styles.qty}>{wishlistItems.length}</div>
                            </a>
                            <Dropdown menu={cartMenuItems} trigger={['click']}>
                                <a className={styles.cartLink} aria-label="Carrinho de compras">
                                    <FaShoppingCart />
                                    <span>Seu Carrinho</span>
                                    <div className={styles.qty}>{cartItems.length}</div>
                                </a>
                            </Dropdown>
                        </div>
                    </Col>
                </Row>
            </div>
        </header>
    );
};

export default MainHeader;
