import { render } from '@testing-library/react';
import { expect, describe, test } from 'vitest';
import Color, { colorMap } from '@/components/Color';

const color = 'Black';

describe('Color', () => {
  test('Color should div with given background color based on colorMap', () => {
    const { container } = render(<Color color={color} />);
    // should have sr-only with color value
    expect(container.querySelector('.color-value')!.textContent).toEqual(color);
    // should have div backgroundColor style with given color
    expect(container.querySelector('div')?.style.backgroundColor).toEqual(
      toRGB(colorMap[color])
    );
  });
  test('Color should div with given background color if colorMap does not have given color', () => {
    const color = 'Blue';
    const { container } = render(<Color color={color} />);
    // should have sr-only with color value
    expect(container.querySelector('.color-value')!.textContent).toEqual(color);
    // should have div backgroundColor style with given color
    expect(container.querySelector('div')?.style.backgroundColor).toEqual(
      toRGB(color)
    );
  });
});

const toRGB = (color: string) => {
  const { style } = new Option();
  style.color = color;
  return style.color;
};
