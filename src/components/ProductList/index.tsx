import ProductItem, { type Product } from '@/components/ProductItem';

type Props = { products: Product[] };

export default function ProductList({ products }: Props) {
  return (
    <div data-testid="products-list" className="grid grid-cols-1 gap-4 flex-1">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}
