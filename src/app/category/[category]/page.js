'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Layout, Typography, Breadcrumb } from 'antd';
import { ProductService } from '@/services/api';
import ProductSection from '@/components/ProductSection/ProductSection';
import MainLayout from '@/components/Layout/Layout';
import styles from './Category.module.css';

const { Content } = Layout;
const { Title } = Typography;

const CategoryPage = () => {
    const params = useParams();
    const category = params.category;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (category) {
            fetchCategoryProducts();
        }
    }, [category]);

    const fetchCategoryProducts = async () => {
        try {
            setLoading(true);
            const data = await ProductService.getByCategory(category);
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <Content>
                <div className={styles.categoryHeader}>
                    <div className={styles.container}>
                        <Breadcrumb className={styles.breadcrumb}>
                            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                            <Breadcrumb.Item>Category</Breadcrumb.Item>
                            <Breadcrumb.Item>{category}</Breadcrumb.Item>
                        </Breadcrumb>
                        <Title level={2} className={styles.categoryTitle}>
                            {category?.charAt(0).toUpperCase() + category?.slice(1).replace('-', ' ')}
                        </Title>
                    </div>
                </div>

                <div className={styles.categoryContent}>
                    <div className={styles.container}>
                        <ProductSection 
                            products={products}
                            loading={loading}
                        />
                    </div>
                </div>
            </Content>
        </MainLayout>
    );
};

export default CategoryPage;