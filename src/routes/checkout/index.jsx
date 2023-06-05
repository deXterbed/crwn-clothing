import { useContext } from 'react'
import { CartContext } from '../../contexts/cart-context'
import './checkout.scss'
import CheckoutItem from '../../components/checkout-item'
const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext)
  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          Price
        </div>
        <div className='header-block'>
          Remove
        </div>
      </div>
      {cartItems.map(cartItem => (
        <CheckoutItem key={cartItem.id} item={cartItem} />
      ))}
      <div className='total'>Total: ${cartTotal}</div>
    </div>
  )
}

export default Checkout