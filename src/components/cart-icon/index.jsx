import { useContext } from 'react';
import { CartContext } from '../../contexts/cart-context';
import { CartIconContainer, ItemCountContainer, ShoppingIconContainer } from './styles.jsx';

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartItemsCount } = useContext(CartContext);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIconContainer />
      <ItemCountContainer>{cartItemsCount}</ItemCountContainer>
    </CartIconContainer>
  )
};

export default CartIcon;