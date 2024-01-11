import { type Product } from '@/components/ProductItem';
import Products from '@/components/Products';
import { ProductsProvider } from '@/store';

type ApiResponse = {
  error?: string;
  products: Product[];
};

async function getProducts(): Promise<ApiResponse> {
  try {
    const products = await fetch(
      'https://my-json-server.typicode.com/benirvingplt/products/products'
    ).then((res) => res.json());
    return { products };
  } catch (error) {
    return { error: 'Unable to get products', products: [] };
  }
}

export default async function Home() {
  const { error, products }: ApiResponse = await getProducts();

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="mt-2 md:mt-4">
      <ProductsProvider products={products}>
        <Products />
      </ProductsProvider>
    </div>
  );
}
