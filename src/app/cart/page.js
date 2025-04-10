'use client';

import React from 'react';
import { Button, Typography, App } from 'antd';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import CartItemList from '@/components/CartItemList/CartItemList';
import styles from './Cart.module.css';

const { Title, Text } = Typography;

const CartPage = () => {
    const { message } = App.useApp();
    const router = useRouter();
    const { cartItems = [], total = 0 } = useCart() || {};
    const { user } = useAuth();

    const handleCheckout = () => {
        if (!user) {
            message.info('Please sign in to proceed with checkout');
            router.push('/login');
            return;
        }

        router.push('/checkout');
    };

    return (
        <div className={styles.cartPage}>
            <Title level={2}>Shopping Cart</Title>

            <CartItemList items={cartItems} />

            <div className={styles.cartSummary}>
                <div className={styles.summaryDetails}>
                    <Text strong>Total ({cartItems?.length || 0} items):</Text>
                    <Text strong className={styles.total}>
                        ${(total || 0).toFixed(2)}
                    </Text>
                </div>

                <Button
                    type="primary"
                    size="large"
                    onClick={handleCheckout}
                    disabled={!cartItems?.length}
                    className={styles.checkoutButton}
                >
                    Proceed to Checkout
                </Button>
            </div>
        </div>
    );
};

export default CartPage;