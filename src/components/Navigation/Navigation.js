'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Space } from 'antd';
import styles from './Navigation.module.css';

const Navigation = () => {
    const router = useRouter();
    const pathname = usePathname();

    const categories = [
        { id: 'all', label: 'All' },
        { id: 'electronics', label: 'Electronics' },
        { id: 'mens-clothing', label: "Men's Clothing" },
        { id: 'womens-clothing', label: "Women's Clothing" },
        { id: 'jewelery', label: 'Jewelery' }
    ];

    const handleCategoryClick = (categoryId) => {
        if (categoryId === 'all') {
            router.push('/products');
        } else {
            router.push(`/category/${categoryId}`);
        }
    };

    return (
        <nav className={styles.navigation} role="navigation">
            <div className={styles.container}>
                <Space size={20} className={styles.categoryNav}>
                    {categories.map(({ id, label }) => (
                        <button
                            key={id}
                            onClick={() => handleCategoryClick(id)}
                            className={`${styles.categoryButton} ${pathname === `/category/${id}` ||
                                    (id === 'all' && pathname === '/products')
                                    ? styles.active
                                    : ''
                                }`}
                            aria-label={`Ver produtos da categoria ${label}`}
                        >
                            {label}
                        </button>
                    ))}
                </Space>
            </div>
        </nav>
    );
};

export default Navigation;
