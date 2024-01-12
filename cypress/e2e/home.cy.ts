// import { Product } from '@/components/ProductItem';

describe('Cart', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'https://my-json-server.typicode.com/benirvingplt/products/products',
      {
        fixture: 'products.json',
      }
    );
  });
  it('Test Listing, Filtering, Adding to Cart, Removing from Cart, and Emptying Cart', () => {
    cy.visit('http://localhost:3000');
    cy.fixture('products.json').then((products) => {
      const product = products[0];
      /*
        PLT-1: Viewing product listings
        Given I am on the home page
        Then I am shown a list of product items (image, name, price, qty in bag)
      */
      cy.findByTestId('products-list')
        .children()
        .should('have.length', products.length);
      /*
        PLT-2: Filter by colour
        Given I am viewing all the product listings
        When I choose to filter to show only black items
        Then I am only shown listings for black items
      */
      cy.get('#react-select-color-filter-input').select('Black');
      cy.findByTestId('products-list')
        .children()
        .should(
          'have.length',
          products.filter((item: any) => item.colour === 'Black').length
        );
      // Select Red color
      cy.get('#react-select-color-filter-input').select('Red');
      cy.findByTestId('products-list')
        .children()
        .should(
          'have.length',
          products.filter((item: any) => item.colour === 'Red').length
        );
      // Clear filter
      cy.get('.rs__clear-indicator').click();
      /*
     PLT-3: Add to cart
     Given I am viewing the products listings
     When I press +
     Then my basket qty for this item is incremented
     And my total is updated to reflect the new items in my basket
     */
      cy.findByTestId(`product-${product.id}-add`).click();
      cy.findByTestId(`product-${product.id}-add`).click();
      cy.findByTestId(`product-${product.id}-count`).should('have.text', '2');
      cy.findByTestId('cart-total').should(
        'have.text',
        (2 * product.price).toFixed(2)
      );
      /*
      PLT-3: Reduce quantity
      Given I am viewing the products listings
      When I press -
      Then my basket qty for this item is decremented
      And my total is updated to reflect the new items in my basket
    */
      cy.findByTestId(`product-${product.id}-remove`).click();
      cy.findByTestId(`product-${product.id}-count`).should('have.text', '1');
      cy.findByTestId('cart-total').should(
        'have.text',
        (1 * product.price).toFixed(2)
      );
      /*
      PLT-4: Remove from basket
      Given I am viewing the products listings
      When I press remove
      Then all items of this type are removed from my basket
      And my total is updated to reflect the new items in my basket
    */
      cy.findByTestId(`product-${product.id}-clear`).click();
      cy.findByTestId(`product-${product.id}-count`).should('have.text', '0');
      cy.findByTestId('cart-total').should('have.text', (0).toFixed(2));
    });
  });
});
