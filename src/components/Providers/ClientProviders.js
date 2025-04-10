'use client';

import { Layout } from 'antd';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { LocalizationProvider } from '@/contexts/LocalizationContext';
import TopHeader from '@/components/TopHeader/TopHeader';
import MainHeader from '@/components/MainHeader/MainHeader';
import Navigation from '@/components/Navigation/Navigation';
import Footer from '@/components/Footer/Footer';
import { usePathname } from 'next/navigation';

const { Content } = Layout;

export default function ClientProviders({ children }) {
    const pathname = usePathname();

    const isAuthPage = pathname?.includes('/checkout/auth');

    return (
        <LocalizationProvider>
            <CartProvider>
                <WishlistProvider>
                    <Layout>
                        <TopHeader />
                        <MainHeader />
                        {!isAuthPage && <Navigation />}
                        <Content>
                            {children}
                        </Content>
                        <Footer />
                    </Layout>
                </WishlistProvider>
            </CartProvider>
        </LocalizationProvider>
    );
}