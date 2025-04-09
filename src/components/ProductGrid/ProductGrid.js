'use client';

import React from 'react';
import { Row, Col, Card } from 'antd';
import { HeartOutlined, HeartFilled, ShoppingCartOutlined, ShoppingFilled } from '@ant-design/icons';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import styles from './ProductGrid.module.css';

const ProductGrid = ({ products, loading = false }) => {
    const { addToCart, removeFromCart, isInCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    const formatPrice = (price) => {
        return Number(price).toFixed(2);
    };

    return (
        <Row gutter={[16, 16]} className={styles.productGrid}>
            {products.map((product) => (
                <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                    <Card
                        hoverable
                        className={styles.productCard}
                        cover={
                            <div className={styles.imageContainer}>
                                <img
                                    alt={product.title}
                                    src={product.image}
                                    className={styles.productImage}
                                />
                                {product.discount && (
                                    <span className={styles.discount}>
                                        -{product.discount}%
                                    </span>
                                )}
                                {product.isNew && (
                                    <span className={styles.new}>NEW</span>
                                )}
                            </div>
                        }
                        actions={[
                            <button
                                key="wishlist"
                                onClick={() => isInWishlist(product.id) ?
                                    removeFromWishlist(product.id) :
                                    addToWishlist(product)
                                }
                                className={`${styles.actionButton} ${isInWishlist(product.id) ? styles.active : ''
                                    }`}
                                aria-label="Adicionar à lista de desejos"
                            >
                                {isInWishlist(product.id) ? <HeartFilled /> : <HeartOutlined />}
                            </button>,
                            <button
                                key="cart"
                                onClick={() => isInCart(product.id) ?
                                    removeFromCart(product.id) :
                                    addToCart(product)
                                }
                                className={`${styles.actionButton} ${isInCart(product.id) ? styles.active : ''
                                    }`}
                                aria-label="Adicionar ao carrinho"
                            >
                                {isInCart(product.id) ? <ShoppingFilled /> : <ShoppingCartOutlined />}
                            </button>
                        ]}
                    >
                        <div className={styles.productInfo}>
                            <p className={styles.category}>{product.category}</p>
                            <h3 className={styles.title}>{product.title}</h3>
                            <div className={styles.priceContainer}>
                                <span className={styles.price}>${formatPrice(product.price)}</span>
                                {product.oldPrice && (
                                    <span className={styles.oldPrice}>
                                        ${formatPrice(product.oldPrice)}
                                    </span>
                                )}
                            </div>
                        </div>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default ProductGrid;