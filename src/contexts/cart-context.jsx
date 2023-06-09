import { createContext, useReducer } from 'react';

export const CartContext = createContext({
  isCartOpen: false,
  cartItems: [],
  cartItemsCount: 0,
  cartTotal: 0,
  toggleIsCartOpen: () => { },
  setIsCartOpen: () => { },
  addItemToCart: () => { },
  removeItemFromCart: () => { },
  clearItemFromCart: () => { },
  setCartItemsCount: () => { },
  setCartTotal: () => { }
});

export const CART_ACTION_TYPES = {
  TOGGLE_CART: 'TOGGLE_CART',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS'
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartItemsCount: 0,
  cartTotal: 0
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.TOGGLE_CART:
      return {
        ...state,
        isCartOpen: !state.isCartOpen
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      };
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      };
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { isCartOpen, cartItems, cartItemsCount, cartTotal } = state;

  const toggleIsCartOpen = () => {
    dispatch({ type: CART_ACTION_TYPES.TOGGLE_CART });
  };

  const setIsCartOpen = (isCartOpen) => {
    dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: isCartOpen });
  };

  const setCartItems = (newCartItems) => {
    const newCartItemsCount = newCartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0);
    const newCartTotal = newCartItems.reduce((acc, cartItem) => acc + cartItem.quantity * cartItem.price, 0);
    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: {
        cartItems: newCartItems,
        cartItemsCount: newCartItemsCount,
        cartTotal: newCartTotal
      }
    });
  };

  const addItemToCart = (item) => {
    let newCartItems = [];
    const existingCartItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingCartItem) {
      newCartItems = cartItems.map(cartItem => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem);
    } else {
      newCartItems = [...cartItems, { ...item, quantity: 1 }];
    }
    setCartItems(newCartItems);
  };

  const removeItemFromCart = (item) => {
    let newCartItems = [];
    if (item.quantity > 1) {
      newCartItems = cartItems.map(cartItem => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)
    } else {
      newCartItems = cartItems.filter(cartItem => cartItem.id !== item.id)
    }
    setCartItems(newCartItems);
  };

  const clearItemFromCart = (item) => {
    setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id));
  };

  const value = {
    isCartOpen,
    cartItems,
    cartItemsCount,
    cartTotal,
    toggleIsCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
