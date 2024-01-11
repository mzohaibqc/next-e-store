'use client';
import { useCart } from '@/store';
import classNames from 'classnames';
import Image from 'next/image';
import { useCallback, useMemo } from 'react';
import Color from './Color';
import { Add, Minus, Trash } from './Icons';

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
  const handleAddItem = useCallback(() => {
    addItem(product);
  }, [addItem, product]);
  const handleRemoveItem = useCallback(() => {
    removeItem(product);
  }, [removeItem, product]);
  const handleClearItem = useCallback(() => {
    clearItem(product);
  }, [clearItem, product]);
  const disabled = useMemo(() => count === 0, [count]);
  return (
    <div className={className}>
      <div className="flex rounded-md overflow-hidden bg-white p-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div className="img relative">
          <Image
            src={product.img}
            width={150}
            height={280}
            alt="Product Image"
            style={{ objectFit: 'contain', width: 'auto' }}
            className="rounded-md"
            priority
          />
        </div>
        <div className="info flex-1 px-4 py-2 flex flex-col">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <button
              onClick={handleClearItem}
              disabled={disabled}
              className={classNames('text-lg icon-btn')}
            >
              <Trash />
            </button>
          </div>
          <div className="flex items-center space-x-4 mt-10">
            <p className="text-lg font-medium">Price:</p>
            <p className="text-2xl font-medium">
              &pound; {product.price.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-lg font-medium">Color:</p>
            <Color color={product.colour} />
          </div>
          <div className="flex-1"></div>
          <div className="flex flex-col justify-end items-end w-full">
            <div className="w-full border border-gray-200 p-2 rounded-md max-w-xs flex justify-around items-center">
              <button
                onClick={handleRemoveItem}
                disabled={disabled}
                className={classNames('text-lg icon-btn')}
              >
                <Minus />
              </button>
              <span className="text-lg px-5 py-1 border rounded-md text-center">
                {count}
              </span>
              <button onClick={handleAddItem} className="text-lg icon-btn">
                <Add />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
