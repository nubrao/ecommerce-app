'use client';

import React, { useEffect, useState } from 'react';
import { ProductService } from '@/services/api';
import { Menu, Layout } from 'antd';
import styles from './Navigation.module.css';

const { Header } = Layout;

const Navigation = () => {
    const [categories, setCategories] = useState([]);
    const [isMenuActive, setIsMenuActive] = useState(false);
    
    const fetchCategories = async () => {
        try {
            const data = await ProductService.getCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const menuItems = [
        {
            key: 'home',
            label: <a href="#">Home</a>,
        },
        ...categories.map((category, index) => ({
            key: index.toString(),
            label: <a href={`#${category}`}>{category}</a>,
        })),
    ];

    const toggleMenu = () => {
        setIsMenuActive(!isMenuActive);
    };

    return (
        <Header className={styles.navigation}>
            <div className="container">
                <div id="responsive-nav">
                    <button className={styles['menu-toggle']} onClick={toggleMenu}>
                        Menu
                    </button>

                    <Menu
                        mode="horizontal"
                        className={`main-nav ${isMenuActive ? 'active' : ''}`}
                        items={menuItems}
                    />
                </div>
            </div>
        </Header>
    );
};

export default Navigation;
