'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Typography, Rate, Button, Row, Col, Tag, Divider, App } from 'antd';
import { ShoppingCartOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { ProductService } from '@/services/api';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import styles from './Product.module.css';

const { Title, Text, Paragraph } = Typography;

const ProductDetail = () => {
    const { message } = App.useApp();
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart, isInCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    useEffect(() => {
        fetchProduct();
    }, [params.id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const data = await ProductService.getById(params.id);
            setProduct(data);
        } catch (error) {
            console.error('Error fetching product:', error);
            message.error('Failed to load product details');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        addToCart(product);
        message.success('Product added to cart successfully');
    };

    const handleWishlistToggle = () => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
            message.success('Product removed from wishlist');
        } else {
            addToWishlist(product);
            message.success('Product added to wishlist');
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
        <main>
            <Breadcrumb items={breadcrumbItems} />
            <section
                className={styles.productSection}
                aria-label="Product details"
            >
                <div className={styles.container}>
                    <Row gutter={[32, 32]}>
                        <Col xs={24} md={12}>
                            <div
                                className={styles.imageContainer}
                                role="img"
                                aria-label={product.title}
                            >
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    loading="eager"
                                    width={400}
                                    height={400}
                                />
                                {product.discount > 0 && (
                                    <Tag
                                        color="red"
                                        className={styles.discountTag}
                                        role="status"
                                    >
                                        {product.discount}% OFF
                                    </Tag>
                                )}
                                {product.isNew && (
                                    <Tag
                                        color="blue"
                                        className={styles.newTag}
                                        role="status"
                                    >
                                        NEW
                                    </Tag>
                                )}
                            </div>
                        </Col>
                        <Col xs={24} md={12}>
                            <div className={styles.productInfo}>
                                <Title level={1}>{product.title}</Title>

                                <div
                                    className={styles.ratingContainer}
                                    aria-label={`Product rating: ${product.rating.rate} out of 5 stars`}
                                >
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

                                <div
                                    className={styles.priceContainer}
                                    aria-label={`Price: $${Number(product.price).toFixed(2)}`}
                                >
                                    <Title level={3} type="danger" className={styles.price}>
                                        ${Number(product.price).toFixed(2)}
                                    </Title>
                                    {product.discount > 0 && product.oldPrice && (
                                        <Text
                                            delete
                                            type="secondary"
                                            className={styles.oldPrice}
                                            aria-label={`Original price: $${Number(product.oldPrice).toFixed(2)}`}
                                        >
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

                                <div
                                    className={styles.actions}
                                    role="group"
                                    aria-label="Product actions"
                                >
                                    <Button
                                        type="primary"
                                        size="large"
                                        icon={<ShoppingCartOutlined />}
                                        onClick={handleAddToCart}
                                        disabled={isInCart(product.id)}
                                        className={styles.addToCartBtn}
                                        aria-label={isInCart(product.id) ?
                                            'Product is already in cart' :
                                            'Add product to cart'}
                                    >
                                        {isInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
                                    </Button>
                                    <Button
                                        type="default"
                                        size="large"
                                        icon={isInWishlist(product.id) ?
                                            <HeartFilled /> :
                                            <HeartOutlined />}
                                        onClick={handleWishlistToggle}
                                        className={styles.wishlistBtn}
                                        aria-label={isInWishlist(product.id) ?
                                            'Remove from wishlist' :
                                            'Add to wishlist'}
                                    >
                                        {isInWishlist(product.id) ?
                                            'Remove from Wishlist' :
                                            'Add to Wishlist'}
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        </main>
    );
};

export default ProductDetail;
