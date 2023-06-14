export const CART_ACTION_TYPES = {
  TOGGLE_CART: 'TOGGLE_CART',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS'
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: []
};

export const cartReducer = (state = INITIAL_STATE, action) => {
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
        cartItems: payload
      };
    default:
      return state;
  }
};

export const toggleCart = () => ({
  type: CART_ACTION_TYPES.TOGGLE_CART
});

export const setIsCartOpen = (isCartOpen) => ({
  type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
  payload: isCartOpen
});

const setCartItems = (cartItems) => ({
  type: CART_ACTION_TYPES.SET_CART_ITEMS,
  payload: cartItems
});

export const addItemToCart = (cartItems, item) => {
  let newCartItems = [];
  const existingCartItem = cartItems.find(cartItem => cartItem.id === item.id);
  if (existingCartItem) {
    newCartItems = cartItems.map(cartItem => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem);
  } else {
    newCartItems = [...cartItems, { ...item, quantity: 1 }];
  }
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (cartItems, item) => {
  let newCartItems = [];
  if (item.quantity > 1) {
    newCartItems = cartItems.map(cartItem => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)
  } else {
    newCartItems = cartItems.filter(cartItem => cartItem.id !== item.id)
  }
  return setCartItems(newCartItems);
};

export const clearItemFromCart = (cartItems, item) => {
  return setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id));
};