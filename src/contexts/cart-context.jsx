import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext({
  isCartOpen: true,
  toggleIsCartOpen: () => { },
  cartItems: [],
  cartItemsCount: 0,
  addItemToCart: () => { }
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0));
  }, [cartItems]);

  const addItemToCart = (item) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingCartItem) {
      setCartItems(cartItems.map(cartItem => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  return (
    <CartContext.Provider value={{
      isCartOpen,
      setIsCartOpen,
      cartItems,
      cartItemsCount,
      addItemToCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

