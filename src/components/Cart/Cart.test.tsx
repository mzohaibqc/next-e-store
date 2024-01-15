import { fireEvent, render, screen } from '@testing-library/react';
import { expect, describe, test, vi } from 'vitest';
import Cart from '@/components/Cart';
import * as store from '@/store';

const cartItem: store.CartItem = {
  id: 1,
  name: 'Product 1',
  price: 10,
  img: '/product-1.jpg',
  colour: 'Black',
  count: 10,
};

describe('Cart', () => {
  const useCartSpy = vi.spyOn(store, 'useCart');
  useCartSpy.mockReturnValue({
    total: 100,
    cart: [cartItem],
    addItem: vi.fn(),
    removeItem: vi.fn(),
    clearItem: vi.fn(),
  });
  test('Cart should show the total price', () => {
    const { container } = render(<Cart />);
    expect(screen.getByTestId('cart-count').textContent).toEqual(
      cartItem.count.toString()
    );
    fireEvent.click(screen.getByTestId('cart-button'));
    expect(screen.getByTestId('cart-total').textContent).toEqual(
      (cartItem.price * cartItem.count).toFixed(2)
    );
    expect(container).toMatchSnapshot();
  });
});
