import { render, screen, fireEvent } from '@testing-library/react';
import { expect, describe, test } from 'vitest';
import Products from '@/components/Products';
import * as store from '@/store';
import { type Product } from '@/components/ProductItem';

const { ProductsProvider, CartProvider } = store;

/*
  Note: Added integration test for given use cases/user stories here
*/
describe('Products', () => {
  // const useCartSpy = vi.spyOn(store, 'useProductsStore');
  // useCartSpy.mockReturnValue({
  //   products,
  //   filteredProducts: [product],
  //   color: undefined,
  //   setProducts: vi.fn(),
  //   setColor: vi.fn(),
  // });
  test('Products should get data form store and show all products', async () => {
    const { container } = render(
      <ProductsProvider products={products}>
        <CartProvider>
          <Products />
        </CartProvider>
      </ProductsProvider>
    );
    expect(screen.getByText('Products')).toBeDefined;
    expect(screen.getByText('Cart Total:')).toBeDefined;
    expect(screen.getByTestId('products-list').childNodes.length).toEqual(
      products.length
    );

    /*
      PLT-1: Viewing product listings
      Given I am on the home page
      Then I am shown a list of product items (image, name, price, qty in bag)
    */
    expect(screen.getByTestId('products-list').childNodes.length).toEqual(
      products.length
    );
    products.forEach(matchProduct({ container }));
    /*
      PLT-2: Filter by colour
      Given I am viewing all the product listings
      When I choose to filter to show only black items
      Then I am only shown listings for black items
    */
    // Select Black color
    const input = container.querySelector('.rs__input')!;
    fireEvent.click(input);
    fireEvent.change(input, { target: { value: 'Black' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(screen.getByTestId('products-list').childNodes.length).toEqual(
      products.filter((item) => item.colour === 'Black').length
    );
    // Clear filter
    fireEvent.mouseDown(container.querySelector('.rs__clear-indicator')!);
    expect(screen.getByTestId('products-list').childNodes.length).toEqual(
      products.length
    );
    /*
      PLT-3: Add to cart
      Given I am viewing the products listings
      When I press +
      Then my basket qty for this item is incremented
      And my total is updated to reflect the new items in my basket
    */

    // Add one item to cart
    const product = products[0];
    const addBtn = screen.getByTestId(`product-${product.id}-add`);

    fireEvent.click(addBtn);
    fireEvent.click(addBtn);
    expect(
      screen.getByTestId(`product-${product.id}-count`).textContent
    ).toEqual('2');
    expect(screen.getByTestId('cart-total').textContent).toEqual(
      (2 * product.price).toFixed(2)
    );
    /*
      PLT-3: Reduce quantity
      Given I am viewing the products listings
      When I press -
      Then my basket qty for this item is decremented
      And my total is updated to reflect the new items in my basket
    */
    const removeBtn = screen.getByTestId(`product-${product.id}-remove`);
    fireEvent.click(removeBtn);
    expect(
      screen.getByTestId(`product-${product.id}-count`).textContent
    ).toEqual('1');
    expect(screen.getByTestId('cart-total').textContent).toEqual(
      (1 * product.price).toFixed(2)
    );
    /*
      PLT-4: Remove from basket
      Given I am viewing the products listings
      When I press remove
      Then all items of this type are removed from my basket
      And my total is updated to reflect the new items in my basket
    */
    const clearBtn = screen.getByTestId(`product-${product.id}-clear`);
    fireEvent.click(clearBtn);
    expect(
      screen.getByTestId(`product-${product.id}-count`).textContent
    ).toEqual('0');
    expect(screen.getByTestId('cart-total').textContent).toEqual(
      (0).toFixed(2)
    );
    expect(
      screen
        .getByTestId(`product-${product.id}-remove`)
        .hasAttribute('disabled')
    ).toBeTruthy();
  });
});

const matchProduct =
  ({ container }: { container: HTMLElement }) =>
  (product: Product) => {
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
    expect(
      container.querySelector(
        `[data-testid="product-${product.id}-color"] .color-value`
      )!.textContent
    ).toEqual(product.colour);
    // Verify product count
    expect(
      screen.getByTestId(`product-${product.id}-count`).textContent
    ).toEqual('0');
  };

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
