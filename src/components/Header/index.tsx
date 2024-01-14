'use client';
import Link from 'next/link';
import { Logo } from '@/components/Icons';
import Cart from '@/components/Cart';
import ThemeSwitch from '@/components/ThemeSwitch';

export default function Header() {
  return (
    <header className="z-10 shadow-md sticky top-0 bg-white dark:bg-gray-800 dark:text-white">
      <div className="max-w-6xl py-4 px-4 sm:px-6 lg:px-8 mx-auto flex justify-between items-center gap-4">
        <Link href="/" className="flex items-center gap-2 px-3 py-1 rounded-md">
          <Logo className="w-10 h-10 logo dark:text-white text-gray-900" />
          <h1 className="text-2xl font-bold">E-Store</h1>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeSwitch />
          <Cart />
        </div>
      </div>
    </header>
  );
}
