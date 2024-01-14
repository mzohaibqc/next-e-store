'use client';
import classNames from 'classnames';
import Image from 'next/image';
import { useCallback, useMemo } from 'react';
import Button from '@/components/Button';
import Color from '@/components/Color';
import { Add, Minus } from '@/components/Icons';
import { useCart } from '@/store';

export type Product = {
  id: number;
  colour: string;
  name: string;
  price: number;
  img: string;
};

type Props = {
  product: Product;
  className?: string;
};

export default function ProductItem({ product, className }: Props) {
  const { addItem, removeItem, clearItem, cart } = useCart();
  const count = useMemo(
    () => cart.find((item) => item.id === product.id)?.count || 0,
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
      <div className="flex-1 flex flex-col rounded-md overflow-hidden bg-white dark:bg-gray-900 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
        <div className="img relative w-full h-96 sm:h-80">
          <Image
            fill
            priority
            src={product.img}
            alt="Product Image"
            className="rounded-t-md"
            data-testid={`product-${product.id}-img`}
            style={{ objectFit: 'cover', objectPosition: '50% 20%' }}
            sizes="100%"
          />
        </div>
        <div className="info flex-1 p-3 flex flex-col">
          <h2
            className="text-xl font-semibold mb-3 line-clamp-2"
            title={product.name}
            aria-label={product.name}
          >
            {product.name}
          </h2>

          <div className="flex justify-between items-center gap-3 mb-3">
            <div className="flex gap-3">
              <Color
                color={product.colour}
                data-testid={`product-${product.id}-color`}
              />
              <p className="text-xl text-gray-500 font-medium font-mono">
                &pound;
                <span data-testid={`product-${product.id}-price`}>
                  {product.price.toFixed(2)}
                </span>
              </p>
            </div>
            <button
              className="px-3 text-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:no-underline hover:underline focus:underline underline-offset-4 decoration-2"
              onClick={handleClearItem}
              disabled={disabled}
              data-testid={`product-${product.id}-clear`}
            >
              <span>Remove</span>
            </button>
          </div>
          <div className="w-full border border-gray-200 dark:border-gray-800 px-2 py-1 rounded-md sm:max-w-xs flex justify-around items-center">
            <Button
              onClick={handleRemoveItem}
              disabled={disabled}
              className={classNames('text-lg icon-btn')}
              aria-label="Remove One Item"
              data-testid={`product-${product.id}-remove`}
            >
              <Minus />
            </Button>
            <span
              data-testid={`product-${product.id}-count`}
              className="text-md text-gray-500 px-5 min-w-16 rounded-md text-center"
            >
              {count}
            </span>
            <Button
              onClick={handleAddItem}
              className="text-lg icon-btn"
              aria-label="Add One Item"
              data-testid={`product-${product.id}-add`}
            >
              <Add />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
