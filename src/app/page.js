'use client';

import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';
import HeaderComponent from '../components/Header';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { ProductService } from '../services/api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getAll();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (searchTerm) => {
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  return (
    <div>
      <HeaderComponent onSearch={handleSearch} />
      <div className={styles.homeContainer}>
        <h1 className={styles.homeTitle}>Home</h1>
        <Row gutter={16}>
          {filteredProducts.map((product) => (
            <Col span={8} key={product.id}>
              <Card
                title={product.title}
                cover={<img alt={product.title} src={product.image} />}
              >
                <p>{product.price}</p>
                <Link href={`/product/${product.id}`}>
                  <button>Ver Detalhes</button>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Home;
