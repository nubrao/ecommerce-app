'use client';

import React from 'react';
import { Empty, Button, message } from 'antd';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import styles from './WishlistDropdown.module.css';

const WishlistDropdown = ({ onClose }) => {
    const router = useRouter();
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart, isInCart } = useCart();

    const handleRemove = (e, productId) => {
        e.stopPropagation();
        removeFromWishlist(productId);
        message.success('Item removed from wishlist');
    };

    const handleItemClick = (e, product) => {
        e.preventDefault();
        onClose();
        router.push(`/product/${product.id}`);
    };

    const handleAddAllToCart = () => {
        let addedCount = 0;
        wishlistItems.forEach(item => {
            if (!isInCart(item.id)) {
                addToCart(item);
                addedCount++;
            }
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
            aria-label="Wishlist items"
        >

            {wishlistItems.length === 0 ? (
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
                                onClick={(e) => handleItemClick(e, item)}
                                role="listitem"
                                tabIndex={0}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') handleItemClick(e, item);
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
                                    <h4>{item.title}</h4>
                                    <p>${Number(item.price).toFixed(2)}</p>
                                    {isInCart(item.id) && (
                                        <span
                                            className={styles.inCartBadge}
                                            role="status"
                                        >
                                            In cart
                                        </span>
                                    )}
                                </div>
                                <Button
                                    type="text"
                                    icon={<FaTrash />}
                                    onClick={(e) => handleRemove(e, item.id)}
                                    className={styles.removeBtn}
                                    aria-label={`Remove ${item.title} from wishlist`}
                                />
                            </div>
                        ))}
                    </div>
                    <div className={styles.dropdownFooter}>
                        <Button
                            type="primary"
                            icon={<FaShoppingCart />}
                            onClick={handleAddAllToCart}
                            className={styles.addAllButton}
                            size="large"
                            block
                        >
                            Add all to cart
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default WishlistDropdown;