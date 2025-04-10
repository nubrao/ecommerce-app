'use client';

import React from 'react';
import { Card, Button, Rate, Tooltip, Typography } from 'antd';
import {
    ShoppingCartOutlined,
    HeartOutlined,
    HeartFilled,
    SwapOutlined,
    EyeOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import styles from './ProductCard.module.css';

const { Text, Title } = Typography;

const ProductCard = ({ product, className }) => {
    const { addToCart, isInCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product);
    };

    const handleWishlistToggle = (e) => {
        e.preventDefault();
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <Card
            className={`${styles.productCard} ${className || ''}`}
            cover={
                <Link
                    href={`/product/${product.id}`}
                    className={styles.imageContainer}
                >
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={300}
                        height={300}
                        className={styles.productImage}
                        priority={false}
                    />
                    {product.discount > 0 && (
                        <span className={styles.discountBadge}>
                            -{product.discount}%
                        </span>
                    )}
                    {product.isNew && (
                        <span className={styles.newBadge}>
                            NEW
                        </span>
                    )}
                </Link>
            }
        >
            <div className={styles.productContent}>
                <Link
                    href={`/product/${product.id}`}
                    className={styles.productTitle}
                >
                    <Title level={5} ellipsis={{ rows: 2 }}>
                        {product.title}
                    </Title>
                </Link>

                <div className={styles.ratingContainer}>
                    <Rate
                        disabled
                        defaultValue={product.rating?.rate || 0}
                        allowHalf
                    />
                    <Text type="secondary">({product.rating?.count || 0})</Text>
                </div>

                <div className={styles.priceContainer}>
                    <Text strong className={styles.price}>
                        ${Number(product.price).toFixed(2)}
                    </Text>
                    {product.oldPrice && (
                        <Text delete type="secondary" className={styles.oldPrice}>
                            ${Number(product.oldPrice).toFixed(2)}
                        </Text>
                    )}
                </div>

                <div className={styles.actions}>
                    <Tooltip title="Quick view">
                        <Link href={`/product/${product.id}`}>
                            <Button
                                icon={<EyeOutlined />}
                                className={styles.quickView}
                                shape="circle"
                                size="large"
                            />
                        </Link>
                    </Tooltip>

                    <Tooltip title="Add to compare">
                        <Button
                            icon={<SwapOutlined />}
                            className={styles.addToCompare}
                            shape="circle"
                            size="large"
                        />
                    </Tooltip>

                    <Tooltip title={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}>
                        <Button
                            icon={isInWishlist(product.id) ? <HeartFilled /> : <HeartOutlined />}
                            className={styles.addToWishlist}
                            shape="circle"
                            size="large"
                            onClick={handleWishlistToggle}
                        />
                    </Tooltip>
                </div>

                <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    className={styles.addToCartBtn}
                    onClick={handleAddToCart}
                    disabled={isInCart(product.id)}
                    block
                >
                    {isInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
                </Button>
            </div>
        </Card>
    );
};

export default ProductCard;
