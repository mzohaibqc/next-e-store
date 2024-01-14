import classNames from 'classnames';

type Props = React.ComponentPropsWithoutRef<'div'> & {
  color: string;
  size?: 'small' | 'medium' | 'large';
};

export default function Color({
  color,
  size = 'medium',
  className,
  ...rest
}: Props) {
  return (
    <div
      {...rest}
      className={classNames(
        'rounded-md bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:border dark:border-gray-700',
        {
          'w-4 h-4': size === 'small',
          'w-6 h-6': size === 'medium',
          'w-8 h-8': size === 'large',
        },
        className
      )}
      style={{ backgroundColor: colorMap[color] || color }}
    >
      <span className="sr-only color-value">{color}</span>
    </div>
  );
}

export const colorMap: Record<string, string> = {
  Black: '#000000',
  Red: '#FF0000',
  Stone: '#EFCFB6',
};
