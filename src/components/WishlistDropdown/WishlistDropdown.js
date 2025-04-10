'use client';

import React from 'react';
import { Button, Typography, Empty, App } from 'antd';
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import styles from './WishlistDropdown.module.css';

const { Text, Title } = Typography;

const WishlistDropdown = ({ onClose }) => {
    const { message } = App.useApp();
    const { addToCart } = useCart();
    const { wishlistItems, removeFromWishlist } = useWishlist();

    const handleRemove = (e, productId) => {
        e.stopPropagation();
        removeFromWishlist(productId);
        e.currentTarget.blur();
    };

    const handleAddToCart = (e, item) => {
        e.stopPropagation();
        addToCart(item);
        message.success('Item added to cart!');
        e.currentTarget.blur();
    };

    const handleAddAllToCart = () => {
        let addedCount = 0;

        wishlistItems.forEach(item => {
            addToCart(item);
            addedCount++;
        });

        if (addedCount > 0) {
            message.success(`${addedCount} ${addedCount === 1 ? 'item' : 'items'} added to cart!`);
            onClose();
        } else {
            message.info('All items are already in cart');
        }
    };

    return (
        <div
            className={styles.wishlistDropdown}
            role="dialog"
            aria-label="Wishlist"
        >
            {!wishlistItems?.length ? (
                <Empty
                    description="Your wishlist is empty"
                    className={styles.emptyState}
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
            ) : (
                <>
                    <div
                        className={styles.itemsList}
                        role="list"
                        aria-label="Wishlist items"
                    >
                        {wishlistItems.map(item => (
                            <div
                                key={item.id}
                                className={styles.wishlistItem}
                                role="listitem"
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
                                <div className={styles.actions}>
                                    <Button
                                        type="text"
                                        icon={<ShoppingCartOutlined />}
                                        onClick={(e) => handleAddToCart(e, item)}
                                        className={styles.actionBtn}
                                        aria-label={`Add ${item.title} to cart`}
                                    />
                                    <Button
                                        type="text"
                                        icon={<DeleteOutlined />}
                                        onClick={(e) => handleRemove(e, item.id)}
                                        className={styles.actionBtn}
                                        aria-label={`Remove ${item.title} from wishlist`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button
                        type="primary"
                        icon={<ShoppingCartOutlined />}
                        onClick={handleAddAllToCart}
                        className={styles.addAllButton}
                        block
                        size="large"
                    >
                        Add All to Cart
                    </Button>
                </>
            )}
        </div>
    );
};

export default WishlistDropdown;