'use client';

import { useCart } from '@/store';

export default function Cart() {
  const { total } = useCart();
  return (
    <div className="w-full lg:w-[300px] lg:h-[400px] p-4 rounded-md border bg-white flex justify-between">
      <p className="text-lg font-medium">Total:</p>
      <p className="text-2xl font-medium">&pound; {total.toFixed(2)}</p>
    </div>
  );
}
