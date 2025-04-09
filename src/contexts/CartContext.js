'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    const addToCart = (product) => {
        setCartItems(prev => {
            const newCart = [...prev, product];
            localStorage.setItem('cartItems', JSON.stringify(newCart));
            return newCart;
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prev => {
            const newCart = prev.filter(item => item.id !== productId);
            localStorage.setItem('cartItems', JSON.stringify(newCart));
            return newCart;
        });
    };

    const isInCart = (productId) => {
        return cartItems.some(item => item.id === productId);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            isInCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);