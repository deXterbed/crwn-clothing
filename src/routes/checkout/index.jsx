import { useContext } from 'react'
import { CartContext } from '../../contexts/cart-context'
import CheckoutItem from '../../components/checkout-item'
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './styles.jsx'
const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext)
  return (
    <CheckoutContainer className='checkout-container'>
      <CheckoutHeader className='checkout-header'>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          Price
        </HeaderBlock>
        <HeaderBlock>
          Remove
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map(cartItem => (
        <CheckoutItem key={cartItem.id} item={cartItem} />
      ))}
      <Total>Total: ${cartTotal}</Total>
    </CheckoutContainer>
  )
}

export default Checkout