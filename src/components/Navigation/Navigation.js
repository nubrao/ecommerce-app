'use client';

import React, { useState } from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';

const Navigation = () => {
    const pathname = usePathname();
    const [current, setCurrent] = useState(pathname);

    const navigationItems = [
        { key: '/', label: 'Home', href: '/' },
        { key: '/electronics', label: 'Electronics', href: '/category/electronics' },
        { key: '/jewelery', label: 'Jewelry', href: '/category/jewelery' },
        { key: '/mens-clothing', label: "Men's Clothing", href: '/category/mens-clothing' },
        { key: '/womens-clothing', label: "Women's Clothing", href: '/category/womens-clothing' }
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
                    role="menubar"
                >
                    {navigationItems.map(item => (
                        <Menu.Item
                            key={item.key}
                            role="menuitem"
                            className={styles.menuItem}
                        >
                            <Link
                                href={item.href}
                                className={styles.menuLink}
                                aria-current={current === item.key ? 'page' : undefined}
                            >
                                {item.label}
                            </Link>
                        </Menu.Item>
                    ))}
                </Menu>
            </div>
        </nav>
    );
};

export default Navigation;
