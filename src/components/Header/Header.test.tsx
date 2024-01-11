import { render } from '@testing-library/react';
import { expect, describe, test, vi } from 'vitest';
import Header from '@/components/Header';

describe('Header', () => {
  test('Header should show logo', () => {
    const { container } = render(<Header />);
    // should have link to home page
    expect(container.querySelector('a')!.getAttribute('href')).toEqual('/');
    // should show E-Store text
    expect(container.querySelector('a h1')!.textContent).toEqual('E-Store');
    expect(container.querySelector('a svg')?.classList.contains('logo'))
      .toBeTruthy;
  });
});
