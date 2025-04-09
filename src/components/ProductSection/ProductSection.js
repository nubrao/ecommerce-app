'use client';

import React from 'react';
import { Card, Button, Row, Col } from 'antd';
import { ShoppingCartOutlined, HeartOutlined, SwapOutlined, EyeOutlined } from '@ant-design/icons';
import styles from './ProductSection.module.css';

const ProductSection = ({ title, products }) => {
    return (
        <div className="section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-title">
                            <h3 className="title">{title}</h3>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <Row gutter={[16, 16]}>
                            {products.map((product) => (
                                <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                                    <Card
                                        hoverable
                                        cover={<img alt={product.title} src={product.image} />}
                                    >
                                        <div className="product-body">
                                            <p className="product-category">{product.category}</p>
                                            <h3 className="product-name">
                                                <a href="#">{product.title}</a>
                                            </h3>
                                            <h4 className="product-price">
                                                ${product.price}
                                                {product.oldPrice && (
                                                    <del className="product-old-price">${product.oldPrice}</del>
                                                )}
                                            </h4>
                                            <div className="product-rating">
                                                {Array.from({ length: 5 }, (_, index) => (
                                                    <i key={index} className="fa fa-star"></i>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="product-btns">
                                            <Button
                                                icon={<HeartOutlined />}
                                                type="text"
                                                size="large"
                                                className="add-to-wishlist"
                                            >
                                                Add to Wishlist
                                            </Button>
                                            <Button
                                                icon={<SwapOutlined />}
                                                type="text"
                                                size="large"
                                                className="add-to-compare"
                                            >
                                                Add to Compare
                                            </Button>
                                            <Button
                                                icon={<EyeOutlined />}
                                                type="text"
                                                size="large"
                                                className="quick-view"
                                            >
                                                Quick View
                                            </Button>
                                        </div>

                                        <Button
                                            type="primary"
                                            icon={<ShoppingCartOutlined />}
                                            size="large"
                                            className="add-to-cart-btn"
                                        >
                                            Add to Cart
                                        </Button>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductSection;
