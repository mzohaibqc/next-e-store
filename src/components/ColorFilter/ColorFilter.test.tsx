import { fireEvent, render } from '@testing-library/react';
import { expect, describe, test, vi } from 'vitest';
import ColorFilter from '@/components/ColorFilter';

const colors = ['Black', 'Red', 'Blue'];
const selectedColor = 'Black';

describe('ColorFilter', () => {
  test('ColorFilter should show selected color', () => {
    const onChange = vi.fn();
    const { container } = render(
      <ColorFilter
        colorOptions={colors}
        color={selectedColor}
        onChange={(color: string | undefined) => onChange(color)}
      />
    );
    // should show selected color text
    expect(
      container.querySelector('.rs__single-value .selected-option')?.textContent
    ).toEqual(selectedColor);
    // should show right color
    expect(
      container.querySelector('.rs__single-value .color-value')?.textContent
    ).toEqual(selectedColor);
  });
  test('ColorFilter should call onChange function', () => {
    const onChange = vi.fn();
    const { container } = render(
      <ColorFilter
        colorOptions={colors}
        color={undefined}
        onChange={(color: string | undefined) => onChange(color)}
      />
    );
    // initially no color is selected
    expect(container.querySelector('.rs__single-value')).not.exist;
    // click on input and select color by typing and pressing Enter
    const input = container.querySelector('.rs__input')!;
    fireEvent.click(input);
    fireEvent.change(input, { target: { value: colors[0] } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    // onChange should be invoked with selected color
    expect(onChange).toHaveBeenCalledWith(colors[0]);
  });
});
