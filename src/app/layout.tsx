import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import { CartProvider } from '@/store';
import './globals.css';

const roboto = Roboto({
  weight: ['400', '500'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'E-Store',
  description: 'A simple e-commerce store',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className="min-h-screen max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <CartProvider>{children}</CartProvider>
        </main>
      </body>
    </html>
  );
}
