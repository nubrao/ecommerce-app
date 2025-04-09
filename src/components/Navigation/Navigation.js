'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Space } from 'antd';
import { ProductService } from '@/services/api';
import styles from './Navigation.module.css';

const Navigation = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const categoriesData = await ProductService.getCategories();
            setCategories([
                { id: 'all', name: 'All' },
                ...categoriesData
            ]);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleCategoryClick = (categoryId) => {
        if (categoryId === 'all') {
            router.push('/products');
        } else {
            router.push(`/category/${categoryId}`);
        }
    };

    return (
        <nav className={styles.navigation}>
            <div className={styles.container}>
                <Space size={20} className={styles.categoryNav}>
                    {categories.map(({ id, name }) => (
                        <button
                            key={id}
                            onClick={() => handleCategoryClick(id)}
                            className={`${styles.categoryButton} ${
                                (id === 'all' && pathname === '/products') ||
                                pathname === `/category/${id}`
                                    ? styles.active
                                    : ''
                            }`}
                        >
                            {name}
                        </button>
                    ))}
                </Space>
            </div>
        </nav>
    );
};

export default Navigation;
