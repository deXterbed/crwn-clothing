import { useNavigate } from 'react-router-dom'
import CartItem from '../cart-item'
import { CartDropdownContainer, CartItems, CheckoutButton, EmptyMessage } from './styles.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { setIsCartOpen } from '../../store/cart'
import { selectCartItemsCount, selectCartItems } from '../../selectors/cart'

const CartDropdown = () => {
  const cartItemsCount = useSelector(selectCartItemsCount)
  const cartItems = useSelector(selectCartItems)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleCheckout = () => {
    navigate('/checkout')
    dispatch(setIsCartOpen(false))
  }

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItemsCount > 0 ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <CheckoutButton onClick={handleCheckout}>GO TO CHECKOUT</CheckoutButton>
    </CartDropdownContainer>
  )
}

export default CartDropdown