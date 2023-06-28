import { CategoryItem } from "../categories/types";

export enum CART_ACTION_TYPES {
  TOGGLE_CART = 'TOGGLE_CART',
  SET_IS_CART_OPEN = 'SET_IS_CART_OPEN',
  SET_CART_ITEMS = 'SET_CART_ITEMS'
};

export type CartItem = CategoryItem & {
  quantity: number
};