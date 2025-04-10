'use client';

import React from 'react';
import { Button, Typography, Empty, InputNumber, App } from 'antd';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { DeleteOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { authService } from '@/services/authService';
import styles from './CartDropdown.module.css';

const { Title, Text } = Typography;

const CartDropdown = ({ onClose }) => {
    const router = useRouter();
    const { message } = App.useApp();
    const { cartItems, removeFromCart, updateQuantity, total } = useCart();

    const handleCheckout = (e) => {
        e.preventDefault();

        const authToken = localStorage.getItem('auth-token');
        const authData = localStorage.getItem('auth-data');

        if (!authToken || !authData) {
            message.error('Please login to proceed with checkout');

            localStorage.setItem('redirect-after-login', '/checkout');

            onClose();
            router.push('/login');
            return;
        }

        const checkoutData = {
            cartItems: cartItems.map(item => ({
                id: item.id,
                title: item.title,
                price: Number(item.price),
                quantity: Number(item.quantity || 1),
                image: item.image,
                description: item.description || '',
                category: item.category || ''
            })),
            total: cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0),
            timestamp: Date.now(),
            authToken,
            authData
        };

        localStorage.setItem('checkout-data', JSON.stringify(checkoutData));

        onClose();

        window.location.replace(process.env.NEXT_PUBLIC_CHECKOUT_APP_URL);
    };

    const handleRemove = (e, productId) => {
        e.stopPropagation();
        removeFromCart(productId);
        e.currentTarget.blur();
    };

    const handleItemClick = (productId) => {
        router.push(`/product/${productId}`);
        onClose();
    };

    const handleQuantityChange = (productId, value) => {
        updateQuantity(productId, value);
    };

    const calculateTotal = () => {
        if (!Array.isArray(cartItems)) return 0;
        return cartItems.reduce((total, item) => {
            return total + (Number(item.price) * Number(item.quantity || 1));
        }, 0);
    };

    return (
        <div
            className={styles.cartDropdown}
            role="dialog"
            aria-label="Shopping cart"
        >
            {!cartItems?.length ? (
                <Empty
                    description="Your cart is empty"
                    className={styles.emptyState}
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
            ) : (
                <>
                    <div
                        className={styles.itemsList}
                        role="list"
                        aria-label="Cart items"
                    >
                        {cartItems.map(item => (
                            <div
                                key={item.id}
                                className={styles.cartItem}
                                onClick={() => handleItemClick(item.id)}
                                role="listitem"
                                tabIndex={0}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        handleItemClick(item.id);
                                    }
                                }}
                            >
                                <div className={styles.imageContainer}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        width={50}
                                        height={50}
                                        loading="lazy"
                                    />
                                </div>
                                <div className={styles.itemInfo}>
                                    <Title
                                        level={5}
                                        className={styles.itemTitle}
                                        ellipsis={{ rows: 2 }}
                                    >
                                        {item.title}
                                    </Title>
                                    <div className={styles.itemDetails}>
                                        <Text type="secondary">
                                            ${Number(item.price).toFixed(2)}
                                        </Text>
                                        <InputNumber
                                            min={1}
                                            max={99}
                                            value={item.quantity || 1}
                                            onChange={(value) => handleQuantityChange(item.id, value)}
                                            onClick={(e) => e.stopPropagation()}
                                            className={styles.quantityInput}
                                        />
                                    </div>
                                </div>
                                <Button
                                    type="text"
                                    icon={<DeleteOutlined />}
                                    onClick={(e) => handleRemove(e, item.id)}
                                    className={styles.removeBtn}
                                    aria-label={`Remove ${item.title} from cart`}
                                />
                            </div>
                        ))}
                    </div>
                    <div
                        className={styles.cartSummary}
                        aria-label="Cart summary"
                    >
                        <div className={styles.cartTotal}>
                            <Text strong>Total:</Text>
                            <Text strong>${calculateTotal().toFixed(2)}</Text>
                        </div>
                    </div>
                    <Button
                        type="primary"
                        icon={<ArrowRightOutlined />}
                        onClick={handleCheckout}
                        className={styles.checkoutButton}
                        block
                        size="large"
                        aria-label="Proceed to checkout"
                        disabled={!cartItems.length}
                    >
                        Checkout
                    </Button>
                </>
            )}
        </div>
    );
};

export default CartDropdown;