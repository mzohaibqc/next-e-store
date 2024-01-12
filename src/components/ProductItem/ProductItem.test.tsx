import { fireEvent, render, screen } from '@testing-library/react';
import { expect, describe, test, vi } from 'vitest';
import ProductItem from '@/components/ProductItem';
import { type Product } from '@/components/ProductItem';
import * as store from '@/store';

const product: Product = {
  id: 1,
  name: 'Product 1',
  price: 10,
  img: '/logo.png',
  colour: 'Black',
};
const cartItem: store.CartItem = {
  ...product,
  count: 10,
};

describe('ProductItem', () => {
  const useCartSpy = vi.spyOn(store, 'useCart');
  const mockCart = {
    total: 100,
    cart: [cartItem],
    addItem: vi.fn(),
    removeItem: vi.fn(),
    clearItem: vi.fn(),
  };
  useCartSpy.mockReturnValue(mockCart);
  test('ProductItem should show all data for given product', () => {
    const { container } = render(<ProductItem product={product} />);
    // Verify product name
    expect(screen.getByText(product.name)).toBeDefined;
    // Verify product price
    expect(
      screen.getByTestId(`product-${product.id}-price`).textContent
    ).toEqual(product.price.toFixed(2));
    // verify image src and alt text
    const image = screen.getByTestId(`product-${product.id}-img`);
    expect(decodeURIComponent(image.getAttribute('src') as string)).contain(
      product.img
    );
    expect(image.getAttribute('alt')).toEqual('Product Image');
    // Verify product colour
    expect(container.querySelector('.color-value')!.textContent).toEqual(
      product.colour
    );
    // Verify product count
    expect(
      screen.getByTestId(`product-${product.id}-count`).textContent
    ).toEqual(cartItem.count.toString());
    // Verify actions/buttons
    const addButton = screen.getByLabelText('Add One Item');
    expect(addButton).toBeDefined;
    fireEvent.click(addButton);
    expect(mockCart.addItem.mock.calls[0][0]).toEqual(product);
    const removeButton = screen.getByLabelText('Remove One Item');
    expect(removeButton).toBeDefined;
    fireEvent.click(removeButton);
    expect(mockCart.removeItem.mock.calls[0][0]).toEqual(product);
    const clearButton = screen.getByTestId(`product-${product.id}-clear`);
    expect(clearButton).toBeDefined;
    fireEvent.click(clearButton);
    expect(mockCart.clearItem.mock.calls[0][0]).toEqual(product);

    // Create snapshot
    expect(container).toMatchSnapshot();
  });
});
