import './cart-dropdown.scss'
import Button from '../button'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart-context'
import CartItem from '../cart-item'

const CartDropdown = () => {
  const { cartItemsCount, cartItems } = useContext(CartContext)
  return (
    <div className='cart-dropdown-container'>
      <div className="cart-items">
        {cartItemsCount > 0 ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  )
}

export default CartDropdown