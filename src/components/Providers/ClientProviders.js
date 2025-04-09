'use client';

import { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import TopHeader from '@/components/TopHeader/TopHeader';
import MainHeader from '@/components/MainHeader/MainHeader';
import Navigation from '@/components/Navigation/Navigation';
import Footer from '@/components/Footer/Footer';

const { Content } = Layout;

const CartStateWrapper = ({ children }) => {
    const [mounted, setMounted] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    }, [cartItems, mounted]);

    if (!mounted) return null;

    return children;
};

const WishlistStateWrapper = ({ children }) => {
    const [mounted, setMounted] = useState(false);
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        const savedWishlist = localStorage.getItem('wishlistItems');
        if (savedWishlist) {
            setWishlistItems(JSON.parse(savedWishlist));
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
        }
    }, [wishlistItems, mounted]);

    if (!mounted) return null;

    return children;
};

export default function ClientProviders({ children }) {
    return (
        <CartStateWrapper>
            <CartProvider>
                <WishlistStateWrapper>
                    <WishlistProvider>
                        <Layout>
                            <TopHeader />
                            <MainHeader />
                            <Navigation />
                            <Content>
                                {children}
                            </Content>
                            <Footer />
                        </Layout>
                    </WishlistProvider>
                </WishlistStateWrapper>
            </CartProvider>
        </CartStateWrapper>
    );
}