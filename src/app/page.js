'use client';

import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { ProductService } from '../services/api';
import CarouselSection from '../components/CarouselSection/CarouselSection';
import ProductSection from '../components/ProductSection/ProductSection';
import ProductSectionHeader from '../components/ProductSectionHeader/ProductSectionHeader';
import Newsletter from '@/components/Newsletter/Newsletter';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import styles from './Home.module.css';

const { Content } = Layout;

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [newProducts, setNewProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const initializePage = async () => {
      try {
        setLoading(true);
        const products = await ProductService.getAll();

        const newItems = products
          .filter(product => product.isNew)
          .slice(0, 4);

        const discountedItems = products
          .filter(product => product.discount)
          .sort((a, b) => b.discount - a.discount)
          .slice(0, 4);

        setNewProducts(newItems);
        setBestSellers(discountedItems);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
        setInitializing(false);
      }
    };

    initializePage();
  }, []);

  if (initializing) {
    return <LoadingScreen />;
  }

  return (
    <>
      <CarouselSection />

      <section className={styles.sectionContainer}>
        <div className={styles.sectionWrapper}>
          <ProductSectionHeader
            title="New Products"
            description="Check out our latest arrivals and discover something new for your collection"
          />
          <ProductSection
            products={newProducts}
            loading={loading}
          />
        </div>
      </section>

      <section className={styles.sectionContainer}>
        <div className={styles.sectionWrapper}>
          <ProductSectionHeader
            title="Best Deals"
            description="Our biggest discounts and best offers"
          />
          <ProductSection
            products={bestSellers}
            loading={loading}
          />
        </div>
      </section>

      <Newsletter />
    </>
  );
};

export default Home;
