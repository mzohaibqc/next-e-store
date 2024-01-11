'use client';

import React, {
  Dispatch,
  ProviderProps,
  createContext,
  useCallback,
  useReducer,
} from 'react';

import type { Product } from '@/components/ProductItem';

const productsInitialState = {
  products: [],
  color: undefined,
  filteredProducts: [],
};

type ProductFilterAction = {
  type: 'SET_COLOR';
  payload: string | undefined;
};

type SetProductsAction = {
  type: 'SET_PRODUCTS';
  payload: Product[];
};

type ProductAction = SetProductsAction | ProductFilterAction;

type ProductStoreState = {
  products: Product[];
  color: string | undefined;
  filteredProducts: Product[];
};

const initialProductState: ProductStoreState = {
  products: [],
  color: undefined,
  filteredProducts: [],
};
function productsReducer(
  state: ProductStoreState,
  action: ProductAction
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
  const [state, dispatch]: [ProductStoreState, Dispatch<ProductAction>] =
    useReducer(productsReducer, {
      ...initialProductState,
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
  ...productsInitialState,
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
