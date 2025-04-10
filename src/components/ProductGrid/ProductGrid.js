'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Row, Col, Card, Typography } from 'antd';
import {
    HeartOutlined,
    HeartFilled,
    ShoppingCartOutlined,
    ShoppingFilled
} from '@ant-design/icons';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import styles from './ProductGrid.module.css';

const { Text, Title } = Typography;

const ProductGrid = ({ products, loading = false }) => {
    const router = useRouter();
    const { addToCart, removeFromCart, isInCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    const formatPrice = (price) => {
        return Number(price).toFixed(2);
    };

    const handleProductClick = (e, productId) => {
        const isActionButton = e.target.closest(`.${styles.actionButton}`);
        if (!isActionButton) {
            router.push(`/product/${productId}`);
        }
    };

    const handleActionClick = (e, callback) => {
        e.stopPropagation();
        callback();
    };

    return (
        <div role="region" aria-label="Products grid">
            <Row gutter={[16, 16]} className={styles.productGrid}>
                {products.map((product) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                        <Card
                            hoverable
                            className={styles.productCard}
                            onClick={(e) => handleProductClick(e, product.id)}
                            cover={
                                <div className={styles.imageContainer}>
                                    <img
                                        alt={`Product: ${product.title}`}
                                        src={product.image}
                                        className={styles.productImage}
                                        loading="lazy"
                                        width={200}
                                        height={200}
                                    />
                                    {product.discount > 0 && (
                                        <span
                                            className={styles.discount}
                                            role="text"
                                            aria-label={`${product.discount}% off`}
                                        >
                                            -{product.discount}%
                                        </span>
                                    )}
                                    {product.isNew && (
                                        <span
                                            className={styles.new}
                                            role="text"
                                            aria-label="New product"
                                        >
                                            NEW
                                        </span>
                                    )}
                                </div>
                            }
                            actions={[
                                <button
                                    key="wishlist"
                                    onClick={(e) => handleActionClick(e, () =>
                                        isInWishlist(product.id)
                                            ? removeFromWishlist(product.id)
                                            : addToWishlist(product)
                                    )}
                                    className={`${styles.actionButton} ${isInWishlist(product.id) ? styles.active : ''
                                        }`}
                                    aria-label={isInWishlist(product.id)
                                        ? `Remove ${product.title} from wishlist`
                                        : `Add ${product.title} to wishlist`}
                                >
                                    {isInWishlist(product.id) ? <HeartFilled /> : <HeartOutlined />}
                                </button>,
                                <button
                                    key="cart"
                                    onClick={(e) => handleActionClick(e, () =>
                                        isInCart(product.id)
                                            ? removeFromCart(product.id)
                                            : addToCart(product)
                                    )}
                                    className={`${styles.actionButton} ${isInCart(product.id) ? styles.active : ''
                                        }`}
                                    aria-label={isInCart(product.id)
                                        ? `Remove ${product.title} from cart`
                                        : `Add ${product.title} to cart`}
                                >
                                    {isInCart(product.id) ? <ShoppingFilled /> : <ShoppingCartOutlined />}
                                </button>
                            ]}
                        >
                            <div className={styles.productInfo}>
                                <Text className={styles.category}>
                                    {product.category}
                                </Text>
                                <Title
                                    level={3}
                                    className={styles.title}
                                    ellipsis={{ rows: 2 }}
                                >
                                    {product.title}
                                </Title>
                                <div
                                    className={styles.priceContainer}
                                    aria-label={`Price: $${formatPrice(product.price)}${product.oldPrice ? `, was $${formatPrice(product.oldPrice)}` : ''
                                        }`}
                                >
                                    <Text className={styles.price}>
                                        ${formatPrice(product.price)}
                                    </Text>
                                    {product.discount > 0 && product.oldPrice && (
                                        <Text delete className={styles.oldPrice}>
                                            ${formatPrice(product.oldPrice)}
                                        </Text>
                                    )}
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ProductGrid;