'use client';

import classNames from 'classnames';
import { Fragment, useMemo } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { useCart } from '@/store';
import { Cart as CartLogo } from '@/components/Icons';
import CartItem from '@/components/CartItem';
import CountDot from '@/components/CountDot';
import Button from '../Button';

export default function CartPopover() {
  const { total, cart } = useCart();
  const itemsCount = useMemo(
    () => cart.reduce((acc, item) => acc + item.count, 0),
    [cart]
  );

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            as={Button}
            size="large"
            // className={`
            //     ${open ? 'text-black' : 'text-black/90'}
            //     text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-md text-sm p-1 w-8 h-8 inline-flex items-center justify-center relative`}
          >
            <CartLogo className="w-6 h-6 dark:text-gray-200 text-gray-900" />

            {itemsCount > 0 && (
              <CountDot count={itemsCount} className="absolute -top-2 left-6" />
            )}
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-10 mt-3 sm:mt-2 w-[400px] max-w-xs sm:max-w-sm -translate-x-full ml-8 transform px-4 sm:px-0">
              <div className="w-full p-4 rounded-md border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col justify-between gap-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <div className="flex flex-col gap-2">
                  {cart.map((item) => (
                    <CartItem key={item.id} product={item} />
                  ))}
                  {cart.length === 0 && <p className="text-center">No Items</p>}
                </div>

                <div
                  className={classNames(
                    'flex justify-between pt-2 px-1 border-t',
                    {
                      'mt-3 ': cart.length > 0,
                    }
                  )}
                >
                  <p className="text-lg font-medium">Cart Total:</p>
                  <p className="text-2xl font-medium font-mono">
                    &pound;
                    <span data-testid="cart-total">{total.toFixed(2)}</span>
                  </p>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
