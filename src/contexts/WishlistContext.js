'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        const savedWishlist = localStorage.getItem('wishlistItems');
        if (savedWishlist) {
            setWishlistItems(JSON.parse(savedWishlist));
        }
    }, []);

    const addToWishlist = (product) => {
        setWishlistItems(prev => {
            const newWishlist = [...prev, product];
            localStorage.setItem('wishlistItems', JSON.stringify(newWishlist));
            return newWishlist;
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlistItems(prev => {
            const newWishlist = prev.filter(item => item.id !== productId);
            localStorage.setItem('wishlistItems', JSON.stringify(newWishlist));
            return newWishlist;
        });
    };

    const isInWishlist = (productId) => {
        return wishlistItems.some(item => item.id === productId);
    };

    return (
        <WishlistContext.Provider value={{
            wishlistItems,
            addToWishlist,
            removeFromWishlist,
            isInWishlist
        }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);