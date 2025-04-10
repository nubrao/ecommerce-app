'use client';

import React from 'react';
import { Card, Button, Typography, Space, Divider } from 'antd';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const { Title, Text } = Typography;

const SignInPage = () => {
    const router = useRouter();

    const handleSocialLogin = (provider) => {
        signIn(provider, { callbackUrl: '/checkout' });
    };

    const handleContinueAsGuest = () => {
        router.push('/checkout');
    };

    return (
        <div className={styles.authContainer}>
            <Card className={styles.authCard}>
                <Title level={2} className={styles.title}>
                    Finalizar Compra
                </Title>
                <Text className={styles.subtitle}>
                    Escolha como deseja prosseguir
                </Text>

                <Space direction="vertical" size="large" className={styles.buttonContainer}>
                    <Button
                        icon={<FaGithub />}
                        onClick={() => handleSocialLogin('github')}
                        size="large"
                        block
                    >
                        Continuar com GitHub
                    </Button>

                    <Button
                        icon={<FaGoogle />}
                        onClick={() => handleSocialLogin('google')}
                        size="large"
                        block
                    >
                        Continuar com Google
                    </Button>

                    <Divider>ou</Divider>

                    <Button
                        onClick={handleContinueAsGuest}
                        size="large"
                        type="link"
                        block
                    >
                        Continuar como visitante
                    </Button>
                </Space>
            </Card>
        </div>
    );
};

export default SignInPage;