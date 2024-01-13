import classNames from 'classnames';

type Props = React.ComponentPropsWithoutRef<'div'> & {
  color: string;
};

export default function Color({ color, ...rest }: Props) {
  return (
    <div
      {...rest}
      className={classNames(
        'w-6 h-6 rounded-md bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]',
        rest.className
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
