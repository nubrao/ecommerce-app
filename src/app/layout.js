'use client';

import React, { Suspense } from 'react';
import { App, ConfigProvider } from 'antd';
import ClientProviders from '@/components/Providers/ClientProviders';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ConfigProvider>
          <App>
            <ClientProviders>
              <Suspense fallback={<LoadingScreen />}>
                {children}
              </Suspense>
            </ClientProviders>
          </App>
        </ConfigProvider>
      </body>
    </html>
  );
}
