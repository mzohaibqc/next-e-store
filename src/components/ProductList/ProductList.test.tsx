import { render, screen } from '@testing-library/react';
import { expect, describe, test } from 'vitest';
import ProductList from '@/components/ProductList';
import { type Product } from '@/components/ProductItem';

const product: Product = {
  id: 1,
  name: 'Product 1',
  price: 10,
  img: '/logo.png',
  colour: 'Black',
};
const products: Product[] = [product];

describe('ProductList', () => {
  test('ProductList should show data based on products props', () => {
    render(<ProductList products={products} />);
    expect(screen.getByTestId('products-list').childNodes.length).toEqual(
      products.length
    );
  });
});
