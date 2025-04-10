'use client';

import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Empty } from 'antd';
import { ProductService } from '@/services/api';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import styles from './Products.module.css';

const { Title } = Typography;

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await ProductService.getAll();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to load products. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const breadcrumbItems = [
        { title: 'Home', href: '/' },
        { title: 'All Products' }
    ];

    if (loading) return <LoadingScreen />;

    return (
        <main>
            <div
                className={styles.pageHeader}
                role="region"
                aria-label="Page header"
            >
                <Title level={1} className={styles.pageTitle}>
                    All Products
                </Title>
                <Breadcrumb items={breadcrumbItems} />
            </div>

            <div
                className={styles.productsContent}
                role="main"
                aria-label="Products section"
            >
                <div className={styles.container}>
                    {error ? (
                        <div
                            className={styles.errorState}
                            role="alert"
                            aria-live="polite"
                        >
                            <Empty
                                description={error}
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                        </div>
                    ) : products.length === 0 ? (
                        <div
                            className={styles.emptyState}
                            role="status"
                            aria-live="polite"
                        >
                            <Empty
                                description="No products found"
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                        </div>
                    ) : (
                        <Row gutter={[24, 24]}>
                            <Col span={24}>
                                <ProductGrid
                                    products={products}
                                    aria-label="Products grid"
                                />
                            </Col>
                        </Row>
                    )}
                </div>
            </div>
        </main>
    );
};

export default ProductsPage;