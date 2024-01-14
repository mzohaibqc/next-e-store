import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import Header from '@/components/Header';
import { CartProvider } from '@/store';
import { Provider as ThemeProvider } from '@/store/ThemeProvider';

import './globals.css';

const font = Urbanist({
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
      <body className={font.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <CartProvider>
            <div className="bg-white dark:bg-gray-800 dark:text-white text-gray-900 flex flex-col min-h-screen">
              <Header />
              <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
              </main>
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
