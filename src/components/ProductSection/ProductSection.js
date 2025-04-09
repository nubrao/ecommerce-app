'use client';

import React from 'react';
import { Card, Button, message } from 'antd';
import { HeartOutlined, HeartFilled, ShoppingCartOutlined, ShoppingFilled } from '@ant-design/icons';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import styles from './ProductSection.module.css';

const ProductSection = ({ title, products }) => {
    const { addToCart, removeFromCart, isInCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [messageApi, contextHolder] = message.useMessage();

    const handleAddToWishlist = (product) => {
        const isAlreadyInWishlist = isInWishlist(product.id);

        if (isAlreadyInWishlist) {
            removeFromWishlist(product.id);
            messageApi.info('Produto removido da lista de desejos');
        } else {
            addToWishlist(product);
            messageApi.success('Produto adicionado à lista de desejos');
        }
    };

    const handleAddToCart = (product) => {
        const isAlreadyInCart = isInCart(product.id);

        if (isAlreadyInCart) {
            removeFromCart(product.id);
            messageApi.info('Produto removido do carrinho');
        } else {
            addToCart(product);
            messageApi.success('Produto adicionado ao carrinho');
        }
    };

    return (
        <section className={styles.section} aria-labelledby={`section-${title}`}>
            {contextHolder}
            <div className={styles.container}>
                <div className={styles.sectionTitle}>
                    <h2 id={`section-${title}`}>{title}</h2>
                </div>
                <div className={styles.productGrid}>
                    {products.map((product) => (
                        <Card
                            key={product.id}
                            hoverable
                            className={styles.productCard}
                            cover={
                                <img
                                    alt={product.title}
                                    src={product.image}
                                    className={styles.productImage}
                                />
                            }
                            actions={[
                                <Button
                                    key="wishlist"
                                    type={isInWishlist(product.id) ? 'primary' : 'default'}
                                    icon={isInWishlist(product.id) ? <HeartFilled /> : <HeartOutlined />}
                                    onClick={() => handleAddToWishlist(product)}
                                    className={`${styles.actionButton} ${isInWishlist(product.id) ? styles.active : ''}`}
                                    aria-label={`${isInWishlist(product.id) ? 'Remover da' : 'Adicionar à'} lista de desejos`}
                                />,
                                <Button
                                    key="addToCart"
                                    type={isInCart(product.id) ? 'primary' : 'default'}
                                    icon={isInCart(product.id) ? <ShoppingFilled /> : <ShoppingCartOutlined />}
                                    onClick={() => handleAddToCart(product)}
                                    className={`${styles.actionButton} ${isInCart(product.id) ? styles.active : ''}`}
                                    aria-label={`${isInCart(product.id) ? 'Remover do' : 'Adicionar ao'} carrinho`}
                                />
                            ]}
                        >
                            <div className={styles.productInfo}>
                                <h3>{product.title}</h3>
                                <div className={styles.productPrice}>
                                    ${product.price}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductSection;
