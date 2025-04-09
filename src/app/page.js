'use client';

import React, { useState, useEffect } from 'react';
import HeaderComponent from '../components/MainHeader/MainHeader';
import { ProductService } from '../services/api';
import CarouselSection from '../components/CarouselSection/CarouselSection';
import ProductSection from '../components/ProductSection/ProductSection';
import Footer from '../components/Footer/Footer';
import styles from './Home.module.css';
import Link from 'next/link';
import TopHeader from '../components/TopHeader/TopHeader';
import ProductList from '../components/ProductList/ProductList';
import Navigation from '../components/Navigation/Navigation';
import Newsletter from '@/components/Newsletter/Newsletter';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);

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

  useEffect(() => {
    ProductService.getAll()
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <TopHeader />
      <HeaderComponent />
      <Navigation />
      <CarouselSection />

      <div>
        <ProductSection title="New Products" products={newProducts} />
        <ProductSection title="Best Sellers" products={bestSellers} />
      </div>

      <Newsletter />

      <Footer />
    </div>
  );
};

export default Home;
