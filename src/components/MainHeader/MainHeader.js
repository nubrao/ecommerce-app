import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Dropdown, Menu, Select, Input } from 'antd';
import { FaHeart, FaShoppingCart, FaBars, FaSearch, FaTimes, FaArrowCircleRight } from 'react-icons/fa';
import { ProductService } from '@/services/api';
import styles from './MainHeader.module.css';

const { Option } = Select;

const MainHeader = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('0');
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Product 1', qty: 1, price: 980.00, image: '/img/product01.png' },
        { id: 2, name: 'Product 2', qty: 3, price: 980.00, image: '/img/product02.png' },
    ]);
    const [searchQuery, setSearchQuery] = useState('');

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

    // Função de busca
    const handleSearch = async () => {
        try {
            let data;
            if (selectedCategory === '0') {
                data = await ProductService.getAll();
            } else {
                data = await ProductService.getByCategory(selectedCategory);
            }
            const filteredProducts = data.filter((product) =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setProducts(filteredProducts);
        } catch (error) {
            console.error('Error searching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [selectedCategory]);

    const cartMenu = (
        <Menu>
            {cartItems.map((item) => (
                <Menu.Item key={item.id}>
                    <div className={styles.productWidget}>
                        <div className={styles.productImg}>
                            <img src={item.image} alt={item.name} />
                        </div>
                        <div className={styles.productBody}>
                            <h3 className={styles.productName}>{item.name}</h3>
                            <h4 className={styles.productPrice}>
                                <span className={styles.qty}>{item.qty}x</span>${item.price}
                            </h4>
                        </div>
                        <Button icon={<FaTimes />} className={styles.deleteBtn} onClick={() => removeItemFromCart(item.id)} />
                    </div>
                </Menu.Item>
            ))}
            <Menu.Item className={styles.cartSummary}>
                <small>{cartItems.length} Item(s) selected</small>
                <h5>SUBTOTAL: ${cartItems.reduce((total, item) => total + item.qty * item.price, 0).toFixed(2)}</h5>
            </Menu.Item>
            <Menu.Item className={styles.cartBtns}>
                <Button type="link">View Cart</Button>
                <Button type="link" icon={<FaArrowCircleRight />}>Checkout</Button>
            </Menu.Item>
        </Menu>
    );

    const removeItemFromCart = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    return (
        <div id="header" className={styles.header}>
            <div className={styles.container}>
                <Row justify="space-between" align="middle">
                    <Col span={8}>
                        <div className={styles.headerLogo}>
                            <a href="#" className={styles.logo}>
                                <img src="/img/logo.png" alt="Logo" />
                            </a>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className={styles.headerSearch}>
                            <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                                <Select
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                    className={styles.inputSelect}
                                >
                                    <Option value="0">All Categories</Option>
                                    {categories.map((category, index) => (
                                        <Option key={index} value={category}>
                                            {category}
                                        </Option>
                                    ))}
                                </Select>
                                <Input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search here"
                                    className={styles.input}
                                />
                                <Button
                                    className={styles.searchBtn}
                                    icon={<FaSearch />}
                                    onClick={handleSearch}
                                />
                            </form>
                        </div>
                    </Col>
                    <Col span={8} className={styles.headerCtn}>
                        <Row justify="end" gutter={16}>
                            <Col>
                                <a href="#" className={styles.wishlist}>
                                    <FaHeart />
                                    <span>Your Wishlist</span>
                                    <div className={styles.qty}>2</div>
                                </a>
                            </Col>
                            <Col>
                                <Dropdown menu={cartMenu} trigger={['click']}>
                                    <a className={styles.cartLink}>
                                        <FaShoppingCart />
                                        <span>Your Cart</span>
                                        <div className={styles.qty}>{cartItems.length}</div>
                                    </a>
                                </Dropdown>
                            </Col>
                            <Col>
                                <a href="#" className={styles.menuToggle}>
                                    <FaBars />
                                    <span>Menu</span>
                                </a>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default MainHeader;
