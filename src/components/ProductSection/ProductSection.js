'use client';

import React from 'react';
import ProductGrid from '../ProductGrid/ProductGrid';
import styles from './ProductSection.module.css';

const ProductSection = ({ products, loading = false }) => {
    return (
        <div className={styles.productSection}>
            <ProductGrid products={products} loading={loading} />
        </div>
    );
};

export default ProductSection;
