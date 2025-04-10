'use client';

import React, { Suspense } from 'react';
import { Geist, Geist_Mono } from "next/font/google";
import { App } from 'antd';
import ClientProviders from '@/components/Providers/ClientProviders';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import "./globals.css";

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
        <App>
          <ClientProviders>
            <Suspense fallback={<LoadingScreen />}>
              {children}
            </Suspense>
          </ClientProviders>
        </App>
      </body>
    </html>
  );
}
