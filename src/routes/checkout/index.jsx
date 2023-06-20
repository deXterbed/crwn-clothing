import CheckoutItem from '../../components/checkout-item'
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './styles.jsx'
import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotal } from '../../store/selectors/cart'
import PaymentForm from '../../components/payment-form'
const Checkout = () => {
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)
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
      <PaymentForm />
    </CheckoutContainer>
  )
}

export default Checkout