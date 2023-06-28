import { AnyAction } from "redux";
import { CartItem } from "./types";
import { toggleCart, setIsCartOpen, setCartItems } from "./actions";

export type CartState = {
  readonly isCartOpen: boolean,
  readonly cartItems: CartItem[]
};

const INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: []
};

export const cartReducer = (state = INITIAL_STATE, action: AnyAction): CartState => {
  if(toggleCart.match(action)) {
    return {
      ...state,
      isCartOpen: !state.isCartOpen
    }
  }

  if(setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload
    }
  }

  if(setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload
    }
  }

  return state;
};