'use client';

import React from 'react';
import { Card, Button, Typography, Space, Divider } from 'antd';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const { Title, Text } = Typography;

const CheckoutAuthPage = () => {
    const router = useRouter();

    const socialProviders = [
        {
            name: 'GitHub',
            icon: <FaGithub />,
            provider: 'github',
            ariaLabel: 'Sign in with GitHub'
        },
        {
            name: 'Google',
            icon: <FaGoogle />,
            provider: 'google',
            ariaLabel: 'Sign in with Google'
        }
    ];

    const handleSocialLogin = (provider) => {
        signIn(provider, { callbackUrl: '/checkout' });
    };

    const handleContinueAsGuest = () => {
        router.push('/checkout');
    };

    return (
        <div
            className={styles.authContainer}
            role="main"
            aria-labelledby="checkout-title"
        >
            <Card
                className={styles.authCard}
                role="region"
                aria-label="Checkout authentication options"
            >
                <Title
                    level={2}
                    className={styles.title}
                    id="checkout-title"
                >
                    Complete Checkout
                </Title>
                <Text className={styles.subtitle}>
                    Choose how you would like to proceed
                </Text>

                <Space
                    direction="vertical"
                    size="large"
                    className={styles.buttonContainer}
                >
                    {socialProviders.map((provider) => (
                        <Button
                            key={provider.provider}
                            icon={provider.icon}
                            onClick={() => handleSocialLogin(provider.provider)}
                            size="large"
                            className={styles.socialButton}
                            aria-label={provider.ariaLabel}
                            block
                        >
                            Continue with {provider.name}
                        </Button>
                    ))}

                    <Divider className={styles.divider}>or</Divider>

                    <Button
                        onClick={handleContinueAsGuest}
                        size="large"
                        type="link"
                        className={styles.guestButton}
                        aria-label="Continue as guest to checkout"
                        block
                    >
                        Continue as guest
                    </Button>
                </Space>
            </Card>
        </div>
    );
};

export default CheckoutAuthPage;