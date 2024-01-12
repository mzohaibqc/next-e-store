'use client';
import classNames from 'classnames';
import Image from 'next/image';
import { useCallback, useMemo } from 'react';
import Button from '@/components/Button';
import Color from '@/components/Color';
import { Add, Minus, Trash } from '@/components/Icons';
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
    <div className={className} data-testid={`product-${product.id}`}>
      <div className="flex flex-col sm:flex-row rounded-md overflow-hidden bg-white p-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div className="img relative w-full h-[380px] sm:w-[150px] sm:h-[220px]">
          <Image
            fill
            priority
            src={product.img}
            alt="Product Image"
            className="rounded-md"
            data-testid={`product-${product.id}-img`}
            style={{ objectFit: 'cover', objectPosition: '50% 30%' }}
          />
        </div>
        <div className="info flex-1 px-2 sm:px-4 py-2 flex flex-col">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            {/* <Button
              onClick={handleClearItem}
              disabled={disabled}
              className={classNames('text-lg icon-btn')}
              aria-label="Remove Item"
              data-testid={`product-${product.id}-clear`}
            >
              <Trash />
            </Button> */}
          </div>

          <div className="flex-1 flex flex-col items-center sm:items-end justify-end gap-3">
            <div className="flex justify-between items-center w-full sm:max-w-xs mt-6">
              <div className="flex items-center space-x-3">
                <p className="text-lg font-medium">Color:</p>
                <Color
                  color={product.colour}
                  data-testid={`product-${product.id}-color`}
                />
              </div>
              <div className="flex items-center space-x-3">
                <p className="text-lg font-medium">Price:</p>
                <p className="text-xl font-medium">
                  &pound;
                  <span data-testid={`product-${product.id}-price`}>
                    {product.price.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
            <div className="w-full border border-gray-200 px-2 py-1 rounded-md sm:max-w-xs flex justify-around items-center">
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
                className="text-lg px-5  border rounded-md text-center"
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
            <button
              onClick={handleClearItem}
              disabled={disabled}
              data-testid={`product-${product.id}-clear`}
              className="w-full sm:max-w-xs text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 disabled:bg-gray-400 disabled:cursor-not-allowed dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Remove all Items
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
