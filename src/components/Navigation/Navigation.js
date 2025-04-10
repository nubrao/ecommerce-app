'use client';

import React, { useState } from 'react';
import { Menu } from 'antd';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './Navigation.module.css';

const Navigation = () => {
    const pathname = usePathname();
    const [current, setCurrent] = useState(pathname);

    const menuItems = [
        {
            key: '/',
            label: <Link href="/">Home</Link>
        },
        {
            key: '/electronics',
            label: <Link href="/category/electronics">Electronics</Link>
        },
        {
            key: '/jewelery',
            label: <Link href="/category/jewelery">Jewelry</Link>
        },
        {
            key: '/mens-clothing',
            label: <Link href="/category/mens-clothing">Men&apos;s Clothing</Link>
        },
        {
            key: '/womens-clothing',
            label: <Link href="/category/womens-clothing">Women&apos;s Clothing</Link>
        }
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
