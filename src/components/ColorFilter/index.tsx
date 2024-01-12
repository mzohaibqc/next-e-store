'use client';

import classNames from 'classnames';
import { useMemo } from 'react';
import Select, {
  components,
  OptionProps,
  SingleValueProps,
} from 'react-select';
import Color from '@/components/Color';

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
      id="color-filter"
      className={className}
      options={options}
      instanceId="color-filter"
      placeholder="Select Color"
      aria-label="Filter Color"
      classNamePrefix="rs"
      // aria-activedescendant="color-filter"
      components={{ SingleValue, Option }}
      isClearable
      classNames={{
        control: (state) =>
          classNames('!border-gray-300 !rounded-md', {
            '!border-gray-800 !rounded-md !shadow-[0_0_0_1px_#000000]':
              state.isFocused,
          }),
        option: (state) =>
          classNames('!bg-white', {
            '!bg-gray-300 !text-black': state.isSelected,
            '!bg-gray-200': state.isFocused,
          }),
      }}
      value={value}
      onChange={(option) => {
        onChange((option as ColorOption | null)?.value);
      }}
    />
  );
}

const SingleValue = ({ children, ...props }: SingleValueProps<ColorOption>) => {
  return (
    <components.SingleValue {...props}>
      <div className="flex items-center gap-2">
        <Color color={props.data.value} />
        <span className="selected-option">{children}</span>
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