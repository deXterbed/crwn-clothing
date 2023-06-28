import { useSelector, useDispatch } from 'react-redux';

import { toggleCart } from '../../store/reducers/cart/actions';
import { selectCartItemsCount } from '../../store/selectors/cart';
import { CartIconContainer, ItemCountContainer, ShoppingIconContainer } from './styles';

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