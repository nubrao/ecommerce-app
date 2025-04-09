'use client';

import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { ProductService } from '../../../services/api';
import styles from '../../../styles/Product.module.css';

const ProductPage = ({ params }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            if (params?.id) {
                const data = await ProductService.getById(params.id);
                setProduct(data);
            }
        };

        fetchProduct();
    }, [params]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className={styles.productContainer}>
            <Card className={styles.productCard} title={product.title}>
                <img
                    className={styles.productImage}
                    alt={product.title}
                    src={product.image}
                />
                <div className={styles.productDetails}>
                    <p>{product.description}</p>
                    <p className={styles.productPrice}>${product.price}</p>
                </div>
            </Card>
        </div>
    );
};

export default ProductPage;
