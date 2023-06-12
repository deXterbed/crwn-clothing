import { CartIconContainer, ItemCountContainer, ShoppingIconContainer } from './styles.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart } from '../../store/cart';
import { selectCartItemsCount } from '../../selectors/cart';

const CartIcon = () => {
  const cartItemsCount = useSelector(selectCartItemsCount);
  const dispatch = useDispatch();
  const toggleIsCartOpen = () => dispatch(toggleCart());
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIconContainer />
      <ItemCountContainer>{cartItemsCount}</ItemCountContainer>
    </CartIconContainer>
  )
};

export default CartIcon;