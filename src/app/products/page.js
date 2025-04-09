'use client';

import React, { useState, useEffect } from 'react';
import { Row, Col, Breadcrumb } from 'antd';
import Layout from '@/components/Layout/Layout';
import { ProductService } from '@/services/api';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
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

    return (
        <Layout>
            <div className={styles.breadcrumbContainer}>
                <div className={styles.container}>
                    <Breadcrumb
                        items={[
                            { title: 'Home', href: '/' },
                            { title: 'All Products' }
                        ]}
                    />
                </div>
            </div>

            <div className={styles.productsSection}>
                <div className={styles.container}>
                    <Row>
                        <Col span={24}>
                            <ProductGrid 
                                products={products} 
                                loading={loading}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </Layout>
    );
};

export default ProductsPage;