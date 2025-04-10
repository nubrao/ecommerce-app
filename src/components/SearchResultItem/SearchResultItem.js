'use client';

import React from 'react';
import { Avatar, Typography } from 'antd';
import Link from 'next/link';
import styles from './SearchResultItem.module.css';

const { Text } = Typography;

const SearchResultItem = ({ product }) => {
    const formatPrice = (price) => {
        return Number(price).toFixed(2);
    };

    return (
        <Link
            href={`/product/${product.id}`}
            className={styles.resultItem}
            role="option"
            aria-label={`${product.title} - $${formatPrice(product.price)}`}
        >
            <div className={styles.productInfo}>
                <Avatar
                    src={product.image}
                    alt=""
                    className={styles.productImage}
                    size={50}
                />
                <div className={styles.productDetails}>
                    <Text
                        className={styles.productTitle}
                        ellipsis={{ rows: 2 }}
                    >
                        {product.title}
                    </Text>
                    <div className={styles.productMeta}>
                        <Text className={styles.productCategory}>
                            {product.category}
                        </Text>
                        <Text className={styles.productPrice}>
                            ${formatPrice(product.price)}
                        </Text>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SearchResultItem;