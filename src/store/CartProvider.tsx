'use client';

import React, {
  Dispatch,
  ProviderProps,
  createContext,
  useCallback,
  useReducer,
} from 'react';

import type { Product } from '@/components/ProductItem';

type Resolve<T> = {
  [K in keyof T]: Resolve<T[K]>;
};

export type CartItem = Resolve<Product & { count: number }>;

type CartAction = {
  type: 'ADD_ITEM' | 'REMOVE_ITEM' | 'CLEAR_ITEM';
  payload: Product;
};

export type CartStoreState = {
  total: number;
  cart: CartItem[];
  color?: string;
};
export type CartStoreType = CartStoreState & {
  addItem: (item: Product) => void;
  removeItem: (item: Product) => void;
  clearItem: () => void;
};
export const cartInitialState: CartStoreState = {
  total: 0,
  cart: [],
};

function updateCartItemCount(
  state: CartStoreState,
  id: number,
  count: number
): CartStoreState['cart'] {
  return state.cart.map((cartItem) => {
    if (cartItem.id === id) {
      return {
        ...cartItem,
        count: cartItem.count + count,
      };
    }
    return cartItem;
  });
}
function cartReducer(
  state: CartStoreState,
  action: CartAction
): CartStoreState {
  const item = action.payload;
  const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
  switch (action.type) {
    case 'ADD_ITEM':
      if (existingItem) {
        return {
          ...state,
          total: state.total + item.price,
          cart: updateCartItemCount(state, item.id, 1),
        };
      }
      return {
        ...state,
        total: state.total + item.price,
        cart: [...state.cart, { ...item, count: 1 }],
      };
    case 'REMOVE_ITEM':
      if (!existingItem) {
        return state;
      }
      return {
        ...state,
        total: state.total - existingItem.price,
        cart: updateCartItemCount(state, existingItem.id, -1),
      };
    case 'CLEAR_ITEM':
      if (!existingItem) {
        return state;
      }
      return {
        ...state,
        total: state.total - existingItem.count * existingItem.price,
        cart: state.cart.filter((cartItem) => cartItem.id !== existingItem.id),
      };

    default:
      return state;
  }
}

function useCartContext() {
  const [state, dispatch]: [CartStoreState, Dispatch<CartAction>] = useReducer(
    cartReducer,
    cartInitialState
  );
  const addItem = useCallback(
    (payload: Product) => dispatch({ type: 'ADD_ITEM', payload }),
    []
  );
  const removeItem = useCallback(
    (payload: Product) => dispatch({ type: 'REMOVE_ITEM', payload }),
    []
  );
  const clearItem = useCallback(
    (payload: Product) => dispatch({ type: 'CLEAR_ITEM', payload }),
    []
  );
  return { ...state, addItem, removeItem, clearItem };
}

export const CartContext = createContext<ReturnType<typeof useCartContext>>({
  total: 0,
  cart: [],
  addItem: () => {},
  removeItem: () => {},
  clearItem: () => {},
});

type Props = Omit<ProviderProps<CartStoreState>, 'value'>;

export function CartProvider({ children }: Props) {
  const state = useCartContext();
  return <CartContext.Provider value={state}>{children}</CartContext.Provider>;
}

export function useCart() {
  const store = React.useContext(CartContext);
  return store;
}
