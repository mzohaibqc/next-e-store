'use client';

import { useCart } from '@/store';

export default function Cart() {
  const { total } = useCart();
  return (
    <div className="w-full lg:w-[300px] lg:h-[400px] p-4 rounded-md border bg-white flex justify-between">
      <p className="text-lg font-medium">Cart Total:</p>
      <p className="text-2xl font-medium">
        &pound;<span data-testid="cart-total">{total.toFixed(2)}</span>
      </p>
    </div>
  );
}
