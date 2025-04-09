'use client';

import React from 'react';
import { Card, Button, Typography, Space } from 'antd';
import { useRouter } from 'next/navigation';
import { FaUser, FaUserPlus } from 'react-icons/fa';
import styles from './page.module.css';

const { Title, Text } = Typography;

const CheckoutAuth = () => {
    const router = useRouter();

    const handleGuestCheckout = () => {
        router.push('/checkout');
    };

    const handleLogin = () => {
        // Implementar depois
        router.push('/login?redirect=/checkout');
    };

    return (
        <div className={styles.authContainer}>
            <Card className={styles.authCard}>
                <Title level={2} className={styles.title}>
                    Como deseja continuar?
                </Title>
                <Text className={styles.subtitle}>
                    Escolha como deseja prosseguir com sua compra
                </Text>
                
                <Space direction="vertical" size="large" className={styles.buttonContainer}>
                    <Button 
                        type="primary" 
                        size="large" 
                        icon={<FaUser />}
                        onClick={handleLogin}
                        block
                    >
                        Entrar com minha conta
                    </Button>
                    
                    <Button 
                        size="large" 
                        icon={<FaUserPlus />}
                        onClick={handleGuestCheckout}
                        block
                    >
                        Continuar como visitante
                    </Button>
                </Space>
            </Card>
        </div>
    );
};

export default CheckoutAuth;