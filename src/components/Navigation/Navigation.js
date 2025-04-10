'use client';

import React, { useState } from 'react';
import { Menu } from 'antd';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';

const Navigation = () => {
    const pathname = usePathname();
    const [current, setCurrent] = useState(pathname);

    const menuItems = [
        { key: '/', label: <a href="/">Home</a> },
        { key: '/electronics', label: <a href="/category/electronics">Electronics</a> },
        { key: '/jewelery', label: <a href="/category/jewelery">Jewelry</a> },
        { key: '/mens-clothing', label: <a href="/category/mens-clothing">Men's Clothing</a> },
        { key: '/womens-clothing', label: <a href="/category/womens-clothing">Women's Clothing</a> }
    ];

    const onClick = (e) => {
        setCurrent(e.key);
    };

    return (
        <nav className={styles.navigation} role="navigation" aria-label="Main navigation">
            <div className={styles.container}>
                <Menu
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                    className={styles.menu}
                    items={menuItems}
                />
            </div>
        </nav>
    );
};

export default Navigation;
