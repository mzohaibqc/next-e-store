'use client';
import Cart from '@/components/Cart';
import ColorFilter from '@/components/ColorFilter';
import ProductList from '@/components/ProductList';
import { useProductsStore } from '@/store';

export default function Products() {
  const { products, filteredProducts, color, setColor } = useProductsStore();
  const colorOptions = products.map((product) => product.colour);
  return (
    <>
      <div className="py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-semibold">Products</h1>
        <ColorFilter
          colorOptions={colorOptions}
          color={color}
          onChange={setColor}
          className="w-full sm:max-w-xs"
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-4 pb-6">
        <ProductList products={filteredProducts} />
        <Cart />
      </div>
    </>
  );
}
