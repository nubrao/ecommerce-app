'use client';

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, App } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import styles from './Login.module.css';

const { Title, Text } = Typography;

const LoginPage = () => {
    const { message } = App.useApp();
    const router = useRouter();
    const { login, user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPageLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (user) {
            router.push('/account');
        }
    }, [user, router]);

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            await login(values.username, values.password);
            message.success('Welcome back! Login successful.');

            const token = localStorage.getItem('auth-token');
            if (!token) {
                throw new Error('No token received');
            }
            
            router.push('/');
        } catch (error) {
            message.error('Login failed. Please check your username and password.');
        } finally {
            setLoading(false);
        }
    };

    if (pageLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <Title level={2} className={styles.title}>Sign In</Title>
                <Text className={styles.subtitle}>
                    Welcome back! Please sign in to your account
                </Text>

                <Form
                    name="login"
                    onFinish={handleSubmit}
                    layout="vertical"
                    requiredMark={false}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please enter your username' }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Username"
                            size="large"
                            aria-label="Username input"
                            disabled={loading}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Password"
                            size="large"
                            aria-label="Password input"
                            disabled={loading}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className={styles.loginButton}
                            block
                            aria-label="Sign in button"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;