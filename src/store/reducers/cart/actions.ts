import { createAction } from "../../utils/action";
import { CART_ACTION_TYPES, CartItem } from "./types";
import { withMatcher, Action, ActionWithPayload } from "../../utils/action";
import { CategoryItem } from "../categories/types";

type ToggleCart = Action<CART_ACTION_TYPES.TOGGLE_CART>;
type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;
type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export const toggleCart = withMatcher((): ToggleCart => createAction(CART_ACTION_TYPES.TOGGLE_CART));

export const setIsCartOpen = withMatcher((isCartOpen: boolean): SetIsCartOpen => createAction(
  CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen
));

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => createAction(
  CART_ACTION_TYPES.SET_CART_ITEMS,
  cartItems
));

export const addItemToCart = (cartItems: CartItem[], item: CategoryItem): SetCartItems => {
  let newCartItems: CartItem[] = [];
  const existingCartItem = cartItems.find(cartItem => cartItem.id === item.id);
  if (existingCartItem) {
    newCartItems = cartItems.map(cartItem => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem);
  } else {
    newCartItems = [...cartItems, { ...item, quantity: 1 }];
  }
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (cartItems: CartItem[], item: CartItem): SetCartItems => {
  let newCartItems: CartItem[] = [];
  if (item.quantity > 1) {
    newCartItems = cartItems.map(cartItem => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)
  } else {
    newCartItems = cartItems.filter(cartItem => cartItem.id !== item.id)
  }
  return setCartItems(newCartItems);
};

export const clearItemFromCart = (cartItems: CartItem[], item: CartItem): SetCartItems => {
  return setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id));
};