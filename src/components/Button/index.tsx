'use client';

import classNames from 'classnames';

type Props = React.ComponentPropsWithoutRef<'button'> & {
  size?: 'small' | 'medium' | 'large';
};

export default function Button({
  className,
  size = 'medium',
  children,
  ...rest
}: Props) {
  return (
    <button
      className={classNames(
        'text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-md text-sm p-1 inline-flex items-center justify-center',
        className,
        {
          'w-5 h-5': size === 'small',
          'w-6 h-6': size === 'medium',
          'w-8 h-8': size === 'large',
        }
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
