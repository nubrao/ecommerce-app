'use client';

import React from 'react';
import { List, Button, Typography, InputNumber } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import styles from './CartItemList.module.css';

const { Text } = Typography;

const CartItemList = ({ items = [] }) => {
    const { updateQuantity, removeFromCart } = useCart();

    const handleQuantityChange = (item, value) => {
        updateQuantity(item.id, value);
    };

    return (
        <List
            className={styles.cartList}
            itemLayout="horizontal"
            dataSource={items}
            locale={{
                emptyText: 'Your cart is empty'
            }}
            renderItem={item => (
                <List.Item
                    className={styles.cartItem}
                    key={item.id}
                    actions={[
                        <Button
                            key="delete"
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.title} from cart`}
                        />
                    ]}
                >
                    <div className={styles.itemContainer}>
                        <div className={styles.imageContainer}>
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={80}
                                height={80}
                                className={styles.productImage}
                            />
                        </div>
                        <div className={styles.itemDetails}>
                            <div className={styles.itemInfo}>
                                <Text strong className={styles.itemTitle}>
                                    {item.title}
                                </Text>
                                <Text type="secondary" className={styles.itemPrice}>
                                    ${Number(item.price || 0).toFixed(2)}
                                </Text>
                            </div>
                            <div className={styles.quantityContainer}>
                                <InputNumber
                                    min={1}
                                    max={99}
                                    value={item.quantity}
                                    onChange={(value) => handleQuantityChange(item, value)}
                                    className={styles.quantityInput}
                                    aria-label={`Quantity for ${item.title}`}
                                />
                                <Text className={styles.itemTotal}>
                                    ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                                </Text>
                            </div>
                        </div>
                    </div>
                </List.Item>
            )}
        />
    );
};

export default CartItemList;