'use client';

import { useMemo } from 'react';
import Select, {
  components,
  OptionProps,
  SingleValueProps,
} from 'react-select';

import Color from './Color';

type ColorOption = { label: string; value: string };

type Props = {
  color: string | undefined;
  onChange: (color: string | undefined) => void;
  colorOptions: string[];
  className?: string;
};

export default function ProductFilter({
  color,
  onChange,
  colorOptions,
  className,
}: Props) {
  const value = useMemo(() => {
    if (color) {
      return { value: color, label: color };
    }
    return null;
  }, [color]);
  const options = useMemo(
    () =>
      Array.from(new Set(colorOptions)).map((color) => ({
        value: color,
        label: color,
      })),
    [colorOptions]
  );
  return (
    <Select
      className={className}
      options={options}
      instanceId="color-filter"
      placeholder="Select Color"
      aria-label="Filter Color"
      components={{ SingleValue, Option }}
      isClearable
      classNames={{
        control: (state) =>
          state.isFocused
            ? '!border-gray-800 !shadow-[0_0_0_1px_#000000]'
            : '!border-gray-300',
        option: (state) =>
          state.isSelected ? '!bg-gray-300 !text-black' : '!bg-white',
      }}
      value={value}
      onChange={(option: any) => {
        onChange(option?.value);
      }}
    />
  );
}

const SingleValue = ({ children, ...props }: SingleValueProps<ColorOption>) => {
  return (
    <components.SingleValue {...props}>
      <div className="flex items-center gap-2">
        <Color color={props.data.value} />
        {children}
      </div>
    </components.SingleValue>
  );
};

const Option = (props: OptionProps<ColorOption>) => {
  return (
    <components.Option {...props}>
      <div className="flex items-center gap-2">
        <Color color={props.data.value} />
        {props.children}
      </div>
    </components.Option>
  );
};
