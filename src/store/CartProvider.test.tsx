import { renderHook } from '@testing-library/react';
import { expect, describe, test } from 'vitest';
import {
  CartProvider,
  cartReducer,
  type CartAction,
  CartStoreState,
  useCart,
} from '@/store/CartProvider';

const product = {
  id: 1,
  name: 'Product 1',
  price: 10,
  img: '/logo.png',
  colour: 'Black',
};
describe('cartReducer', () => {
  test('cartReducer: Should be able to dispatch actions and update state', () => {
    const initialState = {
      total: 0,
      cart: [],
    };
    let action: CartAction;
    action = {
      type: 'ADD_ITEM',
      payload: product,
    };
    let state: CartStoreState;
    // Add a product to cart
    state = cartReducer(initialState, action);
    expect(state).toMatchObject({
      total: 10,
      cart: [{ ...product, count: 1 }],
    });
    // Add same product again to check item count and total
    state = cartReducer(state, action);
    expect(state).toEqual({
      total: 20,
      cart: [{ ...product, count: 2 }],
    });
    // Add another product to cart
    const product2 = {
      ...product,
      id: 2,
      price: 50,
    };
    action = {
      type: 'ADD_ITEM',
      payload: product2,
    };
    state = cartReducer(state, action);
    expect(state).toEqual({
      total: 70,
      cart: [
        { ...product, count: 2 },
        { ...product2, count: 1 },
      ],
    });
    // Remove product from cart
    action = {
      type: 'REMOVE_ITEM',
      payload: product,
    };
    state = cartReducer(state, action);
    expect(state).toEqual({
      total: 60,
      cart: [
        { ...product, count: 1 },
        { ...product2, count: 1 },
      ],
    });
    // Remove non-existing item/product from cart
    action = {
      type: 'REMOVE_ITEM',
      payload: { ...product, id: 1000 },
    };
    let prevState = state;
    state = cartReducer(state, action);
    expect(state).toEqual(prevState);
    // Clear all items from cart of type product
    action = {
      type: 'CLEAR_ITEM',
      payload: product,
    };
    state = cartReducer(state, action);
    expect(state).toEqual({
      total: 50,
      cart: [{ ...product2, count: 1 }],
    });
    // Clear non-existing item/product from cart
    action = {
      type: 'CLEAR_ITEM',
      payload: { ...product, id: 1000 },
    };
    prevState = state;
    state = cartReducer(state, action);
    expect(state).toEqual(prevState);
    // Test with non-matching action type
    const invalidAction = {
      type: 'INVALID_ACTION',
      payload: { ...product, id: 1000 },
    };
    prevState = state;
    state = cartReducer(state, invalidAction as CartAction);
    expect(state).toEqual(prevState);
  });
});

describe('useCart', () => {
  test('useCart: Should be able to add, remove and clear items', () => {
    const { result, rerender } = renderHook(() => useCart(), {
      wrapper: ({ children }) => <CartProvider>{children}</CartProvider>,
    });
    const { addItem, removeItem, clearItem } = result.current;
    // Add a product to cart 2 times
    addItem(product);
    addItem(product);
    rerender();
    let data: Partial<CartStoreState>;
    data = { total: result.current.total, cart: result.current.cart };
    expect(data).toMatchObject({
      total: 20,
      cart: [{ ...product, count: 2 }],
    });
    // Remove product
    removeItem(product);
    rerender();
    data = { total: result.current.total, cart: result.current.cart };
    expect(data).toEqual({
      total: 10,
      cart: [{ ...product, count: 1 }],
    });

    // Clear an item
    clearItem(product);
    rerender();
    data = { total: result.current.total, cart: result.current.cart };
    expect(data).toEqual({
      total: 0,
      cart: [],
    });
  });
});
