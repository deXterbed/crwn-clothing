import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext({
  isCartOpen: false,
  toggleIsCartOpen: () => { },
  cartItems: [],
  cartItemsCount: 0,
  cartTotal: 0,
  addItemToCart: () => { },
  removeItemFromCart: () => { },
  clearItemFromCart: () => { }
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    setCartItemsCount(cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0));
  }, [cartItems]);

  useEffect(() => {
    setCartTotal(cartItems.reduce((acc, cartItem) => acc + cartItem.quantity * cartItem.price, 0));
  }, [cartItems]);

  const addItemToCart = (item) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingCartItem) {
      setCartItems(cartItems.map(cartItem => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeItemFromCart = (item) => {
    if (item.quantity > 1) {
      setCartItems(cartItems.map(cartItem => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem));
    } else {
      setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id));
    }
  };

  const clearItemFromCart = (item) => {
    setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id));
  };

  return (
    <CartContext.Provider value={{
      isCartOpen,
      setIsCartOpen,
      cartItems,
      cartItemsCount,
      cartTotal,
      addItemToCart,
      removeItemFromCart,
      clearItemFromCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

