import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    setIsCartOpen: (state, action) => {
      state.isCartOpen = action.payload;
    },
    addItemToCart: (state, action) => {
      state.cartItems = addItem(state.cartItems, action.payload);
    },
    removeItemFromCart: (state, action) => {
      state.cartItems = removeItem(state.cartItems, action.payload);
    },
    clearItemFromCart: (state, action) => {
      state.cartItems = clearItem(state.cartItems, action.payload);
    },
  }
});

export const addItem = (cartItems, item) => {
  let newCartItems = [];
  const existingCartItem = cartItems.find(cartItem => cartItem.id === item.id);
  if (existingCartItem) {
    newCartItems = cartItems.map(cartItem => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem);
  } else {
    newCartItems = [...cartItems, { ...item, quantity: 1 }];
  }
  return newCartItems;
};

export const removeItem = (cartItems, item) => {
  let newCartItems = [];
  if (item.quantity > 1) {
    newCartItems = cartItems.map(cartItem => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)
  } else {
    newCartItems = cartItems.filter(cartItem => cartItem.id !== item.id)
  }
  return newCartItems;
};

export const clearItem = (cartItems, item) => {
  return cartItems.filter(cartItem => cartItem.id !== item.id);
};

export const { toggleCart, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;