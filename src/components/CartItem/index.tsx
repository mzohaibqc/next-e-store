'use client';
import classNames from 'classnames';
import Image from 'next/image';
import { useCallback, useMemo } from 'react';
import Button from '@/components/Button';
import Color from '@/components/Color';
import { Add, Minus } from '@/components/Icons';
import { useCart } from '@/store';
import { Product } from '../ProductItem';

type Props = {
  product: Product;
  className?: string;
};

export default function CartItem({ product, className }: Props) {
  const { addItem, removeItem, clearItem, cart } = useCart();
  const count = useMemo(
    () => Number(cart.find((item) => item.id === product.id)?.count),
    [cart, product]
  );
  const handleAddItem = useCallback(() => addItem(product), [addItem, product]);
  const handleRemoveItem = useCallback(
    () => removeItem(product),
    [removeItem, product]
  );
  const handleClearItem = useCallback(
    () => clearItem(product),
    [clearItem, product]
  );
  const disabled = useMemo(() => count === 0, [count]);
  return (
    <div
      className={classNames(className, 'flex flex-col')}
      data-testid={`product-${product.id}`}
    >
      <div className="flex-1 flex rounded-md overflow-hidden bg-white dark:bg-gray-900 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] border border-gray-200 dark:border-gray-800">
        <Image
          priority
          src={product.img}
          alt="Product Image"
          className="rounded-l-md"
          width={50}
          height={80}
          data-testid={`product-${product.id}-img`}
          style={{ objectFit: 'cover', objectPosition: '50% 20%' }}
        />
        <div className="info flex-1 px-2 py-1 flex flex-col">
          <h2
            className="text-sm font-semibold mb-1 line-clamp-1"
            title={product.name}
            aria-label={product.name}
          >
            {product.name}
          </h2>

          <div className="flex justify-between items-center gap-3 mb-1">
            <div className="flex items-center gap-3">
              <Color
                color={product.colour}
                data-testid={`product-${product.id}-color`}
                size="small"
              />
              <p className="text-sm text-gray-500 font-medium font-mono">
                &pound;
                <span data-testid={`product-${product.id}-price`}>
                  {product.price.toFixed(2)}
                </span>
              </p>
            </div>
            <button
              className="px-1 text-sm text-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:no-underline hover:underline focus:underline underline-offset-4 decoration-2"
              onClick={handleClearItem}
              disabled={disabled}
              data-testid={`product-${product.id}-clear`}
            >
              <span>Remove</span>
            </button>
          </div>
          <div className="w-full border border-gray-200 dark:border-gray-800 px-2 rounded-md sm:max-w-xs flex justify-around items-center">
            <Button
              onClick={handleRemoveItem}
              disabled={disabled}
              aria-label="Remove One Item"
              data-testid={`product-${product.id}-remove`}
              size="small"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span
              data-testid={`product-${product.id}-count`}
              className="text-md text-gray-500 px-5 min-w-16 rounded-md text-center"
            >
              {count}
            </span>
            <Button
              onClick={handleAddItem}
              aria-label="Add One Item"
              data-testid={`product-${product.id}-add`}
              size="small"
            >
              <Add className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
