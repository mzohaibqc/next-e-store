import { renderHook } from '@testing-library/react';
import { expect, describe, test } from 'vitest';
import {
  ProductsProvider,
  initialProductsState,
  useProductsStore,
  productsReducer,
  type ProductStoreState,
  type ProductsAction,
} from '@/store/ProductsProvider';
import type { Product } from '@/components/ProductItem';

const product: Product = {
  id: 1,
  name: 'Product 1',
  price: 10,
  img: '/logo.png',
  colour: 'Black',
};
const products: Product[] = [product, { ...product, id: 2, colour: 'Red' }];

describe('productsReducer', () => {
  test('productsReducer: Should be able to dispatch actions and update state', () => {
    let action: ProductsAction;
    action = {
      type: 'SET_PRODUCTS',
      payload: products,
    };
    let state: ProductStoreState;
    // Set products
    state = productsReducer(initialProductsState, action);
    expect(state).toMatchObject({
      products: products,
      filteredProducts: products,
      color: undefined,
    });
    // Set color to filter products
    action = {
      type: 'SET_COLOR',
      payload: 'Red',
    };
    state = productsReducer(state, action);
    expect(state).toEqual({
      products: products,
      filteredProducts: products.filter((p) => p.colour === 'Red'),
      color: 'Red',
    });
    // Test with non-matching action type
    const invalidAction = {
      type: 'INVALID_ACTION',
    };
    const prevState = state;
    state = productsReducer(state, invalidAction as ProductsAction);
    expect(state).toEqual(prevState);
  });
});

describe('useProductsStore', () => {
  test('useProductsStore: Should be able to add, remove and clear items', () => {
    const { result, rerender } = renderHook(() => useProductsStore(), {
      wrapper: ({ children }) => (
        <ProductsProvider products={products}>{children}</ProductsProvider>
      ),
    });
    const { setProducts, setColor } = result.current;
    // Add a product to cart 2 times
    setProducts(products);
    rerender();
    expect(result.current.products).toMatchObject(products);
    expect(result.current.filteredProducts).toMatchObject(products);
    expect(result.current.color).toEqual(undefined);
    // Set color to filter products
    setColor('Black');
    rerender();
    expect(result.current.products).toMatchObject(products);
    expect(result.current.filteredProducts).toMatchObject(
      products.filter((item) => item.colour === 'Black')
    );
    expect(result.current.color).toEqual('Black');
  });
});
