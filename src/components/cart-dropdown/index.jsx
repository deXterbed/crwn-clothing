import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../contexts/cart-context'
import CartItem from '../cart-item'
import { CartDropdownContainer, CartItems, CheckoutButton, EmptyMessage } from './styles.jsx'

const CartDropdown = () => {
  const { cartItemsCount, cartItems, setIsCartOpen } = useContext(CartContext)
  const navigate = useNavigate()

  const handleCheckout = () => {
    navigate('/checkout')
    setIsCartOpen(false)
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