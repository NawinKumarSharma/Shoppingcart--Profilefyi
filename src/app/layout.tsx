import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import { ShopContextProvider } from '@/context/shop-context';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ShopContextProvider>
          <Header />
          {children}
        </ShopContextProvider>
      </body>
    </html>
  );
}
