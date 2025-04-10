'use client';

import React from 'react';
import { Layout, Row, Col, Typography, Space } from 'antd';
import Link from 'next/link';
import {
    FacebookOutlined,
    TwitterOutlined,
    InstagramOutlined,
    LinkedinOutlined,
    PhoneOutlined,
    MailOutlined,
    EnvironmentOutlined,
    CreditCardOutlined,
    HeartFilled
} from '@ant-design/icons';
import styles from './Footer.module.css';

const { Footer: AntFooter } = Layout;
const { Title, Text, Link: TextLink } = Typography;

const Footer = () => {
    const year = new Date().getFullYear();

    const paymentMethods = [
        { icon: <CreditCardOutlined />, label: 'Visa' },
        { icon: <CreditCardOutlined />, label: 'Mastercard' },
        { icon: <CreditCardOutlined />, label: 'PayPal' },
    ];

    const socialLinks = [
        { icon: <FacebookOutlined />, href: '#', label: 'Facebook' },
        { icon: <TwitterOutlined />, href: '#', label: 'Twitter' },
        { icon: <InstagramOutlined />, href: '#', label: 'Instagram' },
        { icon: <LinkedinOutlined />, href: '#', label: 'LinkedIn' },
    ];

    return (
        <AntFooter className={styles.footer}>
            <div className={styles.mainFooter}>
                <div className={styles.container}>
                    <Row gutter={[32, 32]}>
                        <Col xs={24} sm={12} md={6}>
                            <div className={styles.footerSection}>
                                <Title level={4} className={styles.footerTitle}>
                                    About Us
                                </Title>
                                <Text className={styles.footerText}>
                                    Discover our wide selection of products with great prices and excellent customer service.
                                </Text>
                                <Space direction="vertical" className={styles.contactInfo}>
                                    <Link href="tel:+5547992090669" className={styles.footerLink}>
                                        <PhoneOutlined /> +55 47 99209-0669
                                    </Link>
                                    <Link href="mailto:brunomcamara@outlook.com" className={styles.footerLink}>
                                        <MailOutlined /> brunomcamara@outlook.com
                                    </Link>
                                    <Text className={styles.footerLink}>
                                        <EnvironmentOutlined /> 1234 Fake Street, City, Country
                                    </Text>
                                </Space>
                            </div>
                        </Col>

                        <Col xs={24} sm={12} md={6}>
                            <div className={styles.footerSection}>
                                <Title level={4} className={styles.footerTitle}>
                                    Categories
                                </Title>
                                <Space direction="vertical">
                                    <Link href="/category/electronics" className={styles.footerLink}>Electronics</Link>
                                    <Link href="/category/jewelery" className={styles.footerLink}>Jewelery</Link>
                                    <Link href="/category/mens-clothing" className={styles.footerLink}>Men's Clothing</Link>
                                    <Link href="/category/womens-clothing" className={styles.footerLink}>Women's Clothing</Link>
                                </Space>
                            </div>
                        </Col>

                        <Col xs={24} sm={12} md={6}>
                            <div className={styles.footerSection}>
                                <Title level={4} className={styles.footerTitle}>
                                    Information
                                </Title>
                                <Space direction="vertical">
                                    <Link href="/about" className={styles.footerLink}>About Us</Link>
                                    <Link href="/contact" className={styles.footerLink}>Contact Us</Link>
                                    <Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link>
                                    <Link href="/terms" className={styles.footerLink}>Terms & Conditions</Link>
                                    <Link href="/faq" className={styles.footerLink}>FAQ</Link>
                                </Space>
                            </div>
                        </Col>

                        <Col xs={24} sm={12} md={6}>
                            <div className={styles.footerSection}>
                                <Title level={4} className={styles.footerTitle}>
                                    Customer Service
                                </Title>
                                <Space direction="vertical">
                                    <Link href="/account" className={styles.footerLink}>My Account</Link>
                                    <Link href="/orders" className={styles.footerLink}>Order History</Link>
                                    <Link href="/wishlist" className={styles.footerLink}>Wishlist</Link>
                                    <Link href="/returns" className={styles.footerLink}>Returns</Link>
                                    <Link href="/support" className={styles.footerLink}>Support</Link>
                                </Space>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>

            <div className={styles.bottomFooter}>
                <div className={styles.container}>
                    <Row justify="space-between" align="middle">
                        <Col xs={24} md={12}>
                            <div className={styles.copyright}>
                                <Text>
                                    © {year} E-commerce. All rights reserved. Made by Bruno M. Camara
                                </Text>
                            </div>
                        </Col>
                        <Col xs={24} md={12}>
                            <Space className={styles.footerExtra} size={24}>
                                <div className={styles.social} aria-label="Social media links">
                                    {socialLinks.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.href}
                                            className={styles.socialLink}
                                            aria-label={link.label}
                                        >
                                            {link.icon}
                                        </Link>
                                    ))}
                                </div>
                                <div className={styles.payments} aria-label="Payment methods">
                                    {paymentMethods.map((method, index) => (
                                        <span
                                            key={index}
                                            className={styles.paymentIcon}
                                            aria-label={method.label}
                                        >
                                            {method.icon}
                                        </span>
                                    ))}
                                </div>
                            </Space>
                        </Col>
                    </Row>
                </div>
            </div>
        </AntFooter>
    );
};

export default Footer;
