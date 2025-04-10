'use client';

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, App } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import { validateAuth } from '@/utils/auth';
import styles from './Login.module.css';

const { Title, Text } = Typography;

const LoginPage = () => {
    const { message } = App.useApp();
    const router = useRouter();
    const { login, user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            const auth = validateAuth();
            if (auth.isValid && user) {
                const redirectUrl = localStorage.getItem('redirect-after-login');
                if (redirectUrl) {
                    localStorage.removeItem('redirect-after-login');
                    router.push(redirectUrl);
                } else {
                    router.push('/account');
                }
            } else {
                setPageLoading(false);
            }
        };

        checkAuth();
    }, [user, router]);

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const userData = await login(values.username, values.password);

            if (userData) {
                message.success('Welcome back! Login successful.');
                const redirectUrl = localStorage.getItem('redirect-after-login');
                if (redirectUrl) {
                    localStorage.removeItem('redirect-after-login');
                    router.push(redirectUrl);
                } else {
                    router.push('/account');
                }
            }
        } catch (error) {
            console.error('Login error:', error);
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