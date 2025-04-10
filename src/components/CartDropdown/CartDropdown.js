'use client';

import React from 'react';
import { Button, Typography, Empty } from 'antd';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { DeleteOutlined, ArrowRightOutlined } from '@ant-design/icons';
import styles from './CartDropdown.module.css';

const { Title, Text } = Typography;

const CartDropdown = ({ onClose }) => {
    const router = useRouter();
    const { cartItems, removeFromCart } = useCart();

    const handleCheckout = () => {
        router.push('/checkout/auth');
        onClose();
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

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    return (
        <div 
            className={styles.cartDropdown}
            role="dialog"
            aria-label="Shopping cart"
        >
            {cartItems.length === 0 ? (
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
                                    <Text type="secondary">
                                        ${Number(item.price).toFixed(2)}
                                    </Text>
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
                    >
                        Checkout
                    </Button>
                </>
            )}
        </div>
    );
};

export default CartDropdown;