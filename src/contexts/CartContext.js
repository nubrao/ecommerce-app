'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    const saveCart = (items) => {
        setCartItems(items);
        localStorage.setItem('cart', JSON.stringify(items));
    };

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);

            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            }

            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        const newItems = cartItems.filter(item => item.id !== productId);
        saveCart(newItems);
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return;

        const newItems = cartItems.map(item =>
            item.id === productId
                ? { ...item, quantity: quantity }
                : item
        );
        saveCart(newItems);
    };

    const clearCart = () => {
        saveCart([]);
    };

    const isInCart = (productId) => {
        return cartItems.some(item => item.id === productId);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + (Number(item.price) * Number(item.quantity || 1));
        }, 0);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            isInCart,
            total: calculateTotal()
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);