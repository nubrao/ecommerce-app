'use client';

import React, { useState, useEffect } from 'react';
import { Input, Layout, Menu } from 'antd';
import { useRouter } from 'next/navigation';
import styles from '../styles/Header.module.css';

const { Header } = Layout;

const HeaderComponent = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchTerm);
        }
    };

    const handleItemClick = (id) => {
        router.push(`/product/${id}`);
    };

    return (
        <Header className={styles.header}>
            <div className={styles.searchContainer}>
                <Input
                    className={styles.searchInput}
                    placeholder="Buscar produtos"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onPressEnter={handleSearch}
                />
            </div>
        </Header>
    );
};

export default HeaderComponent;
