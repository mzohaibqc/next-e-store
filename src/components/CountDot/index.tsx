import classNames from 'classnames';
import React from 'react';

type Props = {
  count: number;
  className?: string;
};
export default function CountDot({ count, className }: Props) {
  return (
    <span
      className={classNames(
        'text-xs bg-red-600 text-white rounded-full w-5 h-5 flex justify-center items-center',
        className
      )}
    >
      {count}
    </span>
  );
}
