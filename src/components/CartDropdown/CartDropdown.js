'use client';

import React from 'react';
import { Empty, Button } from 'antd';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { FaTrash, FaArrowRight } from 'react-icons/fa';
import styles from './CartDropdown.module.css';

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
    };

    const handleItemClick = (productId) => {
        router.push(`/product/${productId}`);
        onClose();
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    return (
        <div className={styles.cartDropdown}>
            {cartItems.length === 0 ? (
                <Empty
                    description="Seu carrinho está vazio"
                    className={styles.emptyState}
                />
            ) : (
                <>
                    <div className={styles.itemsList}>
                        {cartItems.map(item => (
                            <div 
                                key={item.id} 
                                className={styles.cartItem}
                                onClick={() => handleItemClick(item.id)}
                            >
                                <div className={styles.imageContainer}>
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div className={styles.itemInfo}>
                                    <h4>{item.title}</h4>
                                    <p>${Number(item.price).toFixed(2)}</p>
                                </div>
                                <Button
                                    type="text"
                                    icon={<FaTrash />}
                                    onClick={(e) => handleRemove(e, item.id)}
                                    className={styles.removeBtn}
                                />
                            </div>
                        ))}
                    </div>
                    <div className={styles.cartSummary}>
                        <div className={styles.cartTotal}>
                            <span>Total:</span>
                            <strong>${calculateTotal().toFixed(2)}</strong>
                        </div>
                    </div>
                    <Button
                        type="primary"
                        icon={<FaArrowRight />}
                        onClick={handleCheckout}
                        className={styles.checkoutButton}
                        block
                    >
                        Finalizar Compra
                    </Button>
                </>
            )}
        </div>
    );
};

export default CartDropdown;