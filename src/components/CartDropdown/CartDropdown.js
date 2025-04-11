'use client';

import React from 'react';
import { Button, Typography, Empty, InputNumber, App } from 'antd';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { DeleteOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { authService } from '@/services/authService';
import Image from 'next/image';
import styles from './CartDropdown.module.css';

const { Title, Text } = Typography;

const CartDropdown = ({ onClose }) => {
    const router = useRouter();
    const { message } = App.useApp();
    const { cartItems, removeFromCart, updateQuantity } = useCart();

    const handleCheckout = async (e) => {
        e.preventDefault();
        onClose();

        try {
            const checkoutData = {
                cartItems,
                total: calculateTotal(),
                timestamp: Date.now()
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_PROXY_URL}/api/shared/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(checkoutData),
                credentials: 'include'
            });

            if (!response.ok) throw new Error('Failed to save cart data');

            window.location.href = `${process.env.NEXT_PUBLIC_PROXY_URL}/checkout`;
        } catch (error) {
            console.error('Error saving cart data:', error);
            message.error('Could not proceed to checkout');
        }
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
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={50}
                                        height={50}
                                        className={styles.productImage}
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