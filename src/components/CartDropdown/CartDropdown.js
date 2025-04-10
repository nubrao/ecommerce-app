'use client';

import React from 'react';
import { Button, Typography, App } from 'antd';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import ProductCard from '../ProductCard/ProductCard';
import styles from './CartDropdown.module.css';

const { Text } = Typography;

const CartDropdown = ({ onClose }) => {
    const { message } = App.useApp();
    const router = useRouter();
    const { cartItems, total } = useCart();
    const { user } = useAuth();

    const handleCheckout = () => {
        if (!user) {
            message.info('Please sign in to proceed with checkout');
            router.push('/login');
            onClose();
            return;
        }

        router.push('/checkout');
        onClose();
    };

    const handleViewCart = () => {
        router.push('/cart');
        onClose();
    };

    return (
        <div className={styles.cartDropdown}>
            <div className={styles.cartList}>
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <ProductCard
                            key={item.id}
                            product={item}
                            showCartControls={true}
                            mini={true}
                        />
                    ))
                ) : (
                    <div className={styles.emptyCart}>
                        <Text>Your cart is empty</Text>
                    </div>
                )}
            </div>

            <div className={styles.cartSummary}>
                <Text>{cartItems.length} Item(s) selected</Text>
                <Text strong>SUBTOTAL: ${total.toFixed(2)}</Text>
            </div>

            <div className={styles.cartButtons}>
                <Button
                    onClick={handleViewCart}
                    className={styles.viewCartButton}
                >
                    View Cart
                </Button>
                <Button
                    type="primary"
                    onClick={handleCheckout}
                    className={styles.checkoutButton}
                    disabled={cartItems.length === 0}
                >
                    Checkout
                </Button>
            </div>
        </div>
    );
};

export default CartDropdown;