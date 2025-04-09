'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './SearchResultItem.module.css';

const SearchResultItem = ({ product }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/product/${product.id}`);
    };

    return (
        <div className={styles.resultItem} onClick={handleClick}>
            <div className={styles.imageContainer}>
                <img src={product.image} alt={product.title} className={styles.productImage} />
            </div>
            <div className={styles.productInfo}>
                <h4 className={styles.productTitle}>{product.title}</h4>
                <p className={styles.productPrice}>${Number(product.price).toFixed(2)}</p>
            </div>
        </div>
    );
};

export default SearchResultItem;