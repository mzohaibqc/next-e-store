'use client';

import React, {
  Dispatch,
  ProviderProps,
  createContext,
  useCallback,
  useReducer,
} from 'react';
import type { Product } from '@/components/ProductItem';

export type ProductFilterAction = {
  type: 'SET_COLOR';
  payload: string | undefined;
};

export type SetProductsAction = {
  type: 'SET_PRODUCTS';
  payload: Product[];
};

export type ProductsAction = SetProductsAction | ProductFilterAction;

export type ProductStoreState = {
  products: Product[];
  color: string | undefined;
  filteredProducts: Product[];
};

export const initialProductsState: ProductStoreState = {
  products: [],
  color: undefined,
  filteredProducts: [],
};
export function productsReducer(
  state: ProductStoreState,
  action: ProductsAction
): ProductStoreState {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload,
      };
    case 'SET_COLOR':
      return {
        ...state,
        color: action.payload,
        filteredProducts: state.products.filter(
          (product) =>
            action.payload === undefined || product.colour === action.payload
        ),
      };

    default:
      return state;
  }
}

function useProductsContext({ products }: { products: Product[] }) {
  const [state, dispatch]: [ProductStoreState, Dispatch<ProductsAction>] =
    useReducer(productsReducer, {
      ...initialProductsState,
      products,
      filteredProducts: products,
    });
  const setProducts = useCallback(
    (payload: Product[]) => dispatch({ type: 'SET_PRODUCTS', payload }),
    []
  );
  const setColor = useCallback(
    (payload: string | undefined) => dispatch({ type: 'SET_COLOR', payload }),
    []
  );
  return { ...state, setProducts, setColor };
}

export const ProductsContext = createContext<
  ReturnType<typeof useProductsContext>
>({
  ...initialProductsState,
  setProducts: () => {},
  setColor: () => {},
});

type Props = Omit<ProviderProps<ProductStoreState>, 'value'> & {
  products: Product[];
};
export function ProductsProvider({ children, products }: Props) {
  const state = useProductsContext({ products });
  return (
    <ProductsContext.Provider value={{ ...state, products }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProductsStore() {
  const store = React.useContext(ProductsContext);
  return store;
}
