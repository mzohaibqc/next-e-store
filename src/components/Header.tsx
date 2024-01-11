import Link from 'next/link';
import { Logo } from './Icons';

export default function Header() {
  return (
    <header className="z-10 bg-background shadow-md fixed top-0 left-0 right-0">
      <div className="max-w-6xl py-4 px-4 sm:px-6 lg:px-8 mx-auto flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 px-3 py-1 rounded-md">
          <Logo className="w-10 h-10" />
          <h1 className="text-2xl font-bold">E-Store</h1>
        </Link>
      </div>
    </header>
  );
}
