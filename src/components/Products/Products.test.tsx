import { render } from '@testing-library/react';
import { expect, describe, test } from 'vitest';
import Products from '@/components/Products';
import * as store from '@/store';
import { type Product } from '@/components/ProductItem';

const { ProductsProvider, CartProvider } = store;

/*
  Note: Added integration test for given use cases/user stories here
*/
describe('Products', () => {
  test('Products should get data form store and show all products', async () => {
    const { container } = render(
      <ProductsProvider products={products}>
        <CartProvider>
          <Products />
        </CartProvider>
      </ProductsProvider>
    );
    // // Create snapshot
    expect(container).toMatchSnapshot();
  });
});

const products: Product[] = [
  {
    id: 1,
    colour: 'Black',
    name: 'Black Sheet Strappy Textured Glitter Bodycon Dress',
    price: 10,
    img: 'http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024',
  },
  {
    id: 2,
    colour: 'Stone',
    name: 'Stone Ribbed Strappy Cut Out Detail Bodycon Dress',
    price: 4,
    img: 'https://cdn-img.prettylittlething.com/3/6/5/a/365a5d1dce6a2b77b564379b302c9d83afccf33b_cmd2051_1.jpg?imwidth=1024',
  },
  {
    id: 3,
    colour: 'Black',
    name: 'Black Frill Tie Shoulder Bodycon Dress',
    price: 7.99,
    img: 'https://cdn-img.prettylittlething.com/d/c/3/3/dc337260f9ecefdb99a8c8e98cd73ccb1b79cea5_cmb6804_4.jpg?imwidth=1024',
  },
  {
    id: 5,
    colour: 'Red',
    name: 'Red Pin Stripe Belt T Shirt Dress',
    price: 17,
    img: 'https://cdn-img.prettylittlething.com/f/7/1/8/f718a4011ddf92f48aeefff6da0f475178694599_cly0842_1.jpg?imwidth=1024',
  },
];
