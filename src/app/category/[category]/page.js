'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Typography } from 'antd';
import { ProductService } from '@/services/api';
import ProductSection from '@/components/ProductSection/ProductSection';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import styles from './Category.module.css';

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

    if (loading) return <LoadingScreen />;

    const breadcrumbItems = [
        { title: 'Home', href: '/' },
        { title: 'Categories', href: '/categories' },
        { title: category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ') }
    ];

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            
            <div className={styles.categoryContent}>
                <div className={styles.container}>
                    <Title level={2} className={styles.categoryTitle}>
                        {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                    </Title>
                    
                    <ProductSection 
                        products={products}
                        loading={loading}
                    />
                </div>
            </div>
        </>
    );
};

export default CategoryPage;