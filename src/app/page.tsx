import { type Product } from '@/components/ProductItem';
import Products from '@/components/Products';
import { API_URL } from '@/config';
import { ProductsProvider } from '@/store';

type ApiResponse = {
  error?: string;
  products: Product[];
};

async function getProducts(): Promise<ApiResponse> {
  try {
    const products = await fetch(API_URL).then((res) => res.json());
    return { products };
  } catch (error) {
    return { error: 'Unable to get products', products: [] };
  }
}

export default async function Home() {
  const { error, products }: ApiResponse = await getProducts();

  if (error) {
    return <div className="py-20">{error}</div>;
  }
  return (
    <div className="mt-4 lg:mt-6">
      <ProductsProvider products={products}>
        <Products />
      </ProductsProvider>
    </div>
  );
}
