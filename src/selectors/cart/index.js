import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectIsCartOpen = createSelector(
  [selectCart],
  (cart) => cart.isCartOpen
);

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((acc, cartItem) => acc + cartItem.quantity * cartItem.price, 0)
);