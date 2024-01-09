import { useCallback, useReducer, useMemo, createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { formatCurrrency } from "../utils/formatCurrency";

export type CartItemType = {
  id: string;
  name: string;
  thc: string;
  price: number;
  quantity: number;
};

type CartType = {
  cart: CartItemType[];
};

export type ActionType = {
  type: string;
  payload?: CartItemType;
};

const REDUCER_ACTION_TYPES = [
  "ADD_ITEM_TO_CART",
  "REMOVE_ITEM_FROM_CART",
  "SET_QUANTITY",
  "SUBMIT_ORDER",
];

const reducer = (state: CartType, action: ActionType) => {
  switch (action.type) {
    case "ADD_ITEM_TO_CART": {
      if (!action.payload) throw new Error("Payload is missing!");
      const { id, name, thc, price } = action.payload;
      const cartCopy: CartItemType[] = state.cart.filter(
        (item) => item.id !== id,
      );
      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.id === id,
      );
      const quantity: number = itemExists ? itemExists.quantity + 1 : 1;

      return {
        ...state,
        cart: [...cartCopy, { id, name, thc, price, quantity }],
      };
    }
    case "REMOVE_ITEM_FROM_CART": {
      if (!action.payload) throw new Error("Payload is missing!");
      const { id } = action.payload;
      const cartCopy: CartItemType[] = state.cart.filter(
        (item) => item.id !== id,
      );
      return { ...state, cart: [...cartCopy] };
    }
    case "SET_QUANTITY": {
      if (!action.payload) throw new Error("Payload is missing!");
      const { id, quantity } = action.payload;
      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.id === id,
      );
      if (!itemExists)
        throw new Error("Item must exists in order to set quantity!");
      const updatedItem: CartItemType = { ...itemExists, quantity };
      const cartCopy: CartItemType[] = state.cart.filter(
        (item) => item.id !== id,
      );
      return { ...state, cart: [...cartCopy, updatedItem] };
    }
    case "SUBMIT_ORDER": {
      return { ...state, cart: [] };
    }
    default:
      return state;
  }
};

const initialState: CartType = { cart: [] };

const usePersistReducer = () => {
  const [savedState, setSavedState] = useLocalStorage<CartType>(
    "cart",
    initialState,
  );

  const reducerLocalStorage = useCallback(
    (state: CartType, action: ActionType): CartType => {
      const newState = reducer(state, action);
      setSavedState(newState);
      return newState;
    },
    [setSavedState],
  );

  return useReducer(reducerLocalStorage, savedState);
};

const useCartContext = () => {
  const [state, dispatch] = usePersistReducer();
  const ReducerActions = useMemo(() => REDUCER_ACTION_TYPES, []);

  const itemsTotal: number = state.cart.reduce(
    (acc: number, cartItem: { quantity: number }) => {
      return acc + cartItem.quantity;
    },
    0,
  );

  const num: number = state.cart.reduce(
    (acc: number, cartItem: { quantity: number; price: number }) => {
      return acc + cartItem.quantity * cartItem.price;
    },
    0,
  );
  const cartTotal: string = formatCurrrency(num);

  const cart = state.cart.sort((a, b) => {
    const itemA = Number(a.id.slice(-4));
    const itemB = Number(b.id.slice(-4));
    return itemA - itemB;
  });

  return { dispatch, ReducerActions, itemsTotal, cartTotal, cart };
};

export type CartContextType = ReturnType<typeof useCartContext>;

const initialContextState: CartContextType = {
  dispatch: () => {},
  ReducerActions: REDUCER_ACTION_TYPES,
  itemsTotal: 0,
  cartTotal: "",
  cart: [],
};

const CartContext = createContext(initialContextState);

type PropsType = {
  children: React.ReactNode;
};

export const CartContextProvider = ({ children }: PropsType) => {
  return (
    <CartContext.Provider value={useCartContext()}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
