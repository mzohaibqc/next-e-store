'use client';

import classNames from 'classnames';

type Props = React.ComponentPropsWithoutRef<'button'>;

export default function Button({ className, children, ...rest }: Props) {
  return (
    <button
      className={classNames(
        'w-6 h-6 rounded-md flex items-center justify-center cursor-pointer disabled:cursor-not-allowed text-lg hover:bg-gray-100 hover:border hover:border-gray-300',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
