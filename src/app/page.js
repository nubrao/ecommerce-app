'use client';

import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import HeaderComponent from '../components/MainHeader/MainHeader';
import { ProductService } from '../services/api';
import CarouselSection from '../components/CarouselSection/CarouselSection';
import ProductSection from '../components/ProductSection/ProductSection';
import ProductSectionHeader from '../components/ProductSectionHeader/ProductSectionHeader';
import Footer from '../components/Footer/Footer';
import styles from './Home.module.css';
import TopHeader from '../components/TopHeader/TopHeader';
import Navigation from '../components/Navigation/Navigation';
import Newsletter from '@/components/Newsletter/Newsletter';
import { CartProvider } from '../contexts/CartContext';
import { WishlistProvider } from '../contexts/WishlistContext';

const { Content } = Layout;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['All', 'Electronics', 'Clothing', 'Home'];

  const fetchProducts = async () => {
    try {
      const products = await ProductService.getAll();
      setNewProducts(products.slice(0, 5));
      setBestSellers(products.slice(5, 10));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <CartProvider>
      <WishlistProvider>
        <Layout>
          <TopHeader />
          <HeaderComponent />
          <Navigation />
          <Content>
            <CarouselSection />

            <section className={styles.sectionContainer}>
              <div className={styles.sectionWrapper}>
                <ProductSectionHeader
                  title="New Products"
                  description="Check out our latest arrivals and discover something new for your collection"
                />
                <ProductSection products={newProducts} />
              </div>
            </section>

            <section className={styles.sectionContainer}>
              <div className={styles.sectionWrapper}>
                <ProductSectionHeader
                  title="Best Sellers"
                  description="Our most popular products loved by customers worldwide"
                />
                <ProductSection products={bestSellers} />
              </div>
            </section>

            <Newsletter />
          </Content>
          <Footer />
        </Layout>
      </WishlistProvider>
    </CartProvider>
  );
};

export default Home;
