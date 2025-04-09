'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Typography, Rate, Button, Row, Col, Tag, Divider } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { ProductService } from '@/services/api';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { useCart } from '@/contexts/CartContext';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import styles from './Product.module.css';

const { Title, Text, Paragraph } = Typography;

const ProductDetail = () => {
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart, isInCart } = useCart();

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const data = await ProductService.getById(params.id);
            setProduct(data);
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingScreen />;
    if (!product) return null;

    const breadcrumbItems = [
        { title: 'Home', href: '/' },
        { title: product.category, href: `/category/${product.category}` },
        { title: product.title }
    ];

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className={styles.productSection}>
                <div className={styles.container}>
                    <Row gutter={[32, 32]}>
                        <Col xs={24} md={12}>
                            <div className={styles.imageContainer}>
                                <img src={product.image} alt={product.title} />
                                {product.discount > 0 && (
                                    <Tag color="red" className={styles.discountTag}>
                                        -{product.discount}% OFF
                                    </Tag>
                                )}
                                {product.isNew && (
                                    <Tag color="blue" className={styles.newTag}>
                                        NEW
                                    </Tag>
                                )}
                            </div>
                        </Col>
                        <Col xs={24} md={12}>
                            <div className={styles.productInfo}>
                                <Title level={2}>{product.title}</Title>
                                
                                <div className={styles.ratingContainer}>
                                    <Rate 
                                        disabled 
                                        defaultValue={product.rating.rate} 
                                        allowHalf 
                                    />
                                    <Text type="secondary" className={styles.ratingCount}>
                                        ({product.rating.count} Reviews)
                                    </Text>
                                </div>

                                <Divider />

                                <div className={styles.priceContainer}>
                                    <Title level={3} type="danger" className={styles.price}>
                                        ${Number(product.price).toFixed(2)}
                                    </Title>
                                    {product.discount > 0 && product.oldPrice && (
                                        <Text delete type="secondary" className={styles.oldPrice}>
                                            ${Number(product.oldPrice).toFixed(2)}
                                        </Text>
                                    )}
                                </div>

                                <Divider />

                                <div className={styles.description}>
                                    <Title level={4}>Product Description</Title>
                                    <Paragraph>{product.description}</Paragraph>
                                </div>

                                <Divider />

                                <div className={styles.actions}>
                                    <Button
                                        type="primary"
                                        size="large"
                                        icon={<ShoppingCartOutlined />}
                                        onClick={() => addToCart(product)}
                                        disabled={isInCart(product.id)}
                                        block
                                    >
                                        {isInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;
