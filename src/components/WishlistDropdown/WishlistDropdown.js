'use client';

import React from 'react';
import { Empty, Button, message } from 'antd';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import styles from './WishlistDropdown.module.css';

const WishlistDropdown = ({ onClose }) => {
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart, isInCart } = useCart();

    const handleRemove = (e, productId) => {
        e.stopPropagation();
        removeFromWishlist(productId);
    };

    const handleItemClick = (product) => {
        if (!isInCart(product.id)) {
            addToCart(product);
            message.success('Produto adicionado ao carrinho!');
        }
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
            message.success(`${addedCount} ${addedCount === 1 ? 'produto adicionado' : 'produtos adicionados'} ao carrinho!`);
            onClose();
        } else {
            message.info('Todos os produtos já estão no carrinho');
        }
    };

    return (
        <div className={styles.wishlistDropdown}>
            {wishlistItems.length === 0 ? (
                <Empty
                    description="Sua lista de desejos está vazia"
                    className={styles.emptyState}
                />
            ) : (
                <>
                    <div className={styles.itemsList}>
                        {wishlistItems.map(item => (
                            <div 
                                key={item.id} 
                                className={styles.wishlistItem}
                                onClick={() => handleItemClick(item)}
                            >
                                <div className={styles.imageContainer}>
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div className={styles.itemInfo}>
                                    <h4>{item.title}</h4>
                                    <p>${Number(item.price).toFixed(2)}</p>
                                    {isInCart(item.id) && (
                                        <span className={styles.inCartBadge}>
                                            No carrinho
                                        </span>
                                    )}
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
                    <Button
                        type="primary"
                        icon={<FaShoppingCart />}
                        onClick={handleAddAllToCart}
                        className={styles.addAllButton}
                        block
                    >
                        Adicionar todos ao carrinho
                    </Button>
                </>
            )}
        </div>
    );
};

export default WishlistDropdown;