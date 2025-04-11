'use client';

import React, { useState, useEffect } from 'react';
import { Input, Card, Col, Row } from 'antd';
import Image from 'next/image';
import styles from '../styles/Search.module.css';
import { ProductService } from '../services/api';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await ProductService.getAll();
                setAllProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        setFilteredProducts(
            allProducts.filter((product) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, allProducts]);

    return (
        <div className={styles.searchContainer}>
            <Input
                className={styles.searchInput}
                placeholder="Buscar produtos"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Row gutter={16} className={styles.searchResults}>
                {filteredProducts.map((product) => (
                    <Col span={8} key={product.id}>
                        <Card title={product.title} cover={<Image src={product.image} alt={product.title} width={80} height={80} className={styles.productImage} />}>
                            <p>{product.price}</p>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Search;
