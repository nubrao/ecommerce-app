'use client';

import React, { useState } from 'react';
import { Input, Button, Typography, message } from 'antd';
import {
    MailOutlined,
    FacebookOutlined,
    TwitterOutlined,
    InstagramOutlined,
    LinkedinOutlined
} from '@ant-design/icons';
import styles from './Newsletter.module.css';

const { Title, Text } = Typography;

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const socialLinks = [
        { icon: <FacebookOutlined />, href: '#', label: 'Facebook' },
        { icon: <TwitterOutlined />, href: '#', label: 'Twitter' },
        { icon: <InstagramOutlined />, href: '#', label: 'Instagram' },
        { icon: <LinkedinOutlined />, href: '#', label: 'LinkedIn' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            message.error('Please enter your email address');
            return;
        }

        try {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            message.success('Thank you for subscribing to our newsletter!');
            setEmail('');
        } catch (error) {
            message.error('Failed to subscribe. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className={styles.newsletter} aria-label="Newsletter subscription">
            <div className={styles.container}>
                <div className={styles.content}>
                    <Title level={2} className={styles.title}>
                        Subscribe to Our Newsletter
                    </Title>
                    <Text className={styles.description}>
                        Get the latest updates, deals and exclusive offers directly in your inbox
                    </Text>

                    <form
                        onSubmit={handleSubmit}
                        className={styles.form}
                        aria-label="Newsletter subscription form"
                    >
                        <div className={styles.inputWrapper}>
                            <Input
                                prefix={<MailOutlined className={styles.inputIcon} />}
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.input}
                                aria-label="Email input"
                            />
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                className={styles.subscribeBtn}
                                aria-label="Subscribe button"
                            >
                                Subscribe
                            </Button>
                        </div>
                    </form>

                    <div className={styles.social}>
                        <Text className={styles.socialText}>Follow us on social media:</Text>
                        <ul className={styles.socialList} aria-label="Social media links">
                            {socialLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className={styles.socialLink}
                                        aria-label={link.label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {link.icon}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
