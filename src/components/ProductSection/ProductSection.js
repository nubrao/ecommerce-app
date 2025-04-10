'use client';

import React from 'react';
import { Skeleton } from 'antd';
import ProductGrid from '../ProductGrid/ProductGrid';
import styles from './ProductSection.module.css';

const ProductSection = ({ 
    products = [], 
    loading = false,
    title,
    description 
}) => {
    return (
        <section 
            className={styles.productSection}
            aria-label={title || "Product section"}
        >
            {loading ? (
                <div 
                    className={styles.skeletonWrapper}
                    aria-busy="true"
                >
                    <Skeleton active paragraph={{ rows: 4 }} />
                </div>
            ) : (
                <div
                    className={styles.productContent}
                    aria-live="polite"
                >
                    <ProductGrid products={products} loading={loading} />
                </div>
            )}
        </section>
    );
};

export default ProductSection;
