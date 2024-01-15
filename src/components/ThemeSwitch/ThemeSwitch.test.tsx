import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Provider } from '@/store';
import ThemeSwitch from './index';

describe('ThemeSwitch', () => {
  test('ThemeSwitch should render moon icon in light mode', async () => {
    render(
      <Provider defaultTheme="light">
        <ThemeSwitch />
      </Provider>
    );
    expect(screen.getByText('Moon')).toBeDefined;
    fireEvent.click(screen.getByText('Moon'));
    expect(screen.getByText('Sun')).toBeDefined;
    fireEvent.click(screen.getByText('Sun'));
    expect(screen.getByText('Moon')).toBeDefined;
  });
});
