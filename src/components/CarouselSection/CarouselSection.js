'use client';

import React, { useState, useEffect } from 'react';
import { Button, Typography, Carousel } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { ProductService } from '@/services/api';
import styles from './CarouselSection.module.css';

const { Title, Text } = Typography;

const CarouselSection = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const products = await ProductService.getFeaturedProducts();
                const carouselData = products.map(product => ({
                    id: product.id,
                    title: product.title,
                    subtitle: product.category,
                    description: product.description.substring(0, 100) + '...',
                    image: product.image,
                    link: `/product/${product.id}`,
                    buttonText: "Shop Now",
                    price: product.price
                }));
                setFeaturedProducts(carouselData);
            } catch (error) {
                console.error('Error fetching carousel products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        accessibility: true,
        arrows: true
    };

    if (loading || featuredProducts.length === 0) {
        return null;
    }

    return (
        <section className={styles.carouselSection} aria-label="Featured products carousel">
            <Carousel {...settings}>
                {featuredProducts.map((product) => (
                    <div key={product.id} className={styles.slide}>
                        <div className={styles.container}>
                            <div className={styles.content}>
                                <Text className={styles.subtitle}>
                                    {product.subtitle}
                                </Text>
                                <Title level={1} className={styles.title}>
                                    {product.title}
                                </Title>
                                <Text className={styles.description}>
                                    {product.description}
                                </Text>
                                <div className={styles.priceTag}>
                                    <Text className={styles.price}>
                                        ${product.price}
                                    </Text>
                                </div>
                                <Link href={product.link} passHref>
                                    <Button 
                                        type="primary" 
                                        size="large"
                                        icon={<ShoppingOutlined />}
                                        className={styles.button}
                                        aria-label={`Shop now - ${product.title}`}
                                    >
                                        {product.buttonText}
                                    </Button>
                                </Link>
                            </div>
                            <div 
                                className={styles.imageWrapper}
                                role="img"
                                aria-label={`${product.title} product image`}
                                style={{ backgroundImage: `url(${product.image})` }}
                            />
                        </div>
                    </div>
                ))}
            </Carousel>
        </section>
    );
};

export default CarouselSection;
