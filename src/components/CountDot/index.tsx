import React from 'react';
import classNames from 'classnames';

type Props = React.ComponentPropsWithoutRef<'span'> & {
  count: number;
};
export default function CountDot({ count, className, ...rest }: Props) {
  return (
    <span
      {...rest}
      className={classNames(
        'text-xs bg-red-600 text-white rounded-full w-5 h-5 flex justify-center items-center',
        className
      )}
    >
      {count}
    </span>
  );
}
