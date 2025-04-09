'use client';

import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { Layout } from 'antd';
import TopHeader from '@/components/TopHeader/TopHeader';
import MainHeader from '@/components/MainHeader/MainHeader';
import Navigation from '@/components/Navigation/Navigation';
import Footer from '@/components/Footer/Footer';
import "./globals.css";

const { Content } = Layout;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <CartProvider>
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
        </CartProvider>
      </body>
    </html>
  );
}
