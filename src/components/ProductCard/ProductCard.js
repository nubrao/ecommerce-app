'use client';

import React from 'react';
import { Button, Tooltip, Typography } from 'antd';
import {
    HeartOutlined,
    ExchangeOutlined,
    EyeOutlined,
    ShoppingCartOutlined,
    StarFilled
} from '@ant-design/icons';
import Link from 'next/link';
import styles from './ProductCard.module.css';

const { Text, Title } = Typography;

const ProductCard = ({ product }) => {
    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <StarFilled
                key={index}
                className={index < Math.floor(rating) ? styles.starActive : styles.star}
                aria-hidden="true"
            />
        ));
    };

    return (
        <article
            className={`${styles.product} ${styles.slickSlide}`}
            aria-labelledby={`product-title-${product.id}`}
        >
            <div className={styles.productImg}>
                <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    width={200}
                    height={200}
                />
                {product.discount && (
                    <div
                        className={styles.productLabel}
                        role="text"
                        aria-label={`${product.discount}% off`}
                    >
                        <span className={styles.sale}>-{product.discount}%</span>
                    </div>
                )}
            </div>
            <div className={styles.productBody}>
                <Text className={styles.productCategory}>
                    {product.category}
                </Text>
                <Title
                    level={3}
                    className={styles.productName}
                    id={`product-title-${product.id}`}
                >
                    <Link
                        href={`/product/${product.id}`}
                        aria-label={`View details of ${product.title}`}
                    >
                        {product.title}
                    </Link>
                </Title>
                <div className={styles.priceContainer}>
                    <Text strong className={styles.productPrice}>
                        ${product.price.toFixed(2)}
                    </Text>
                    {product.oldPrice && (
                        <Text delete className={styles.productOldPrice}>
                            ${product.oldPrice.toFixed(2)}
                        </Text>
                    )}
                </div>
                {product.rating && (
                    <div
                        className={styles.productRating}
                        aria-label={`Product rating: ${product.rating} out of 5 stars`}
                    >
                        {renderStars(product.rating)}
                        {product.reviewCount && (
                            <Text className={styles.reviewCount}>
                                ({product.reviewCount})
                            </Text>
                        )}
                    </div>
                )}
                <div
                    className={styles.productBtns}
                    role="group"
                    aria-label="Product actions"
                >
                    <Tooltip title="Add to wishlist">
                        <Button
                            icon={<HeartOutlined />}
                            className={styles.addToWishlist}
                            shape="circle"
                            size="large"
                            aria-label="Add to wishlist"
                        />
                    </Tooltip>
                    <Tooltip title="Add to compare">
                        <Button
                            icon={<ExchangeOutlined />}
                            className={styles.addToCompare}
                            shape="circle"
                            size="large"
                            aria-label="Add to compare list"
                        />
                    </Tooltip>
                    <Tooltip title="Quick view">
                        <Button
                            icon={<EyeOutlined />}
                            className={styles.quickView}
                            shape="circle"
                            size="large"
                            aria-label="Quick view product details"
                        />
                    </Tooltip>
                </div>
            </div>
            <div className={styles.addToCart}>
                <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    size="large"
                    className={styles.addToCartBtn}
                    aria-label={`Add ${product.title} to cart`}
                >
                    Add to cart
                </Button>
            </div>
        </article>
    );
};

export default ProductCard;
