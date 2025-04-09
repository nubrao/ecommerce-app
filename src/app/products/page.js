'use client';

import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { ProductService } from '@/services/api';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import styles from './Products.module.css';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await ProductService.getAll();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingScreen />;

    const breadcrumbItems = [
        { title: 'Home', href: '/' },
        { title: 'All Products' }
    ];

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className={styles.productsContent}>
                <div className={styles.container}>
                    <Row>
                        <Col span={24}>
                            <ProductGrid products={products} />
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
};

export default ProductsPage;