import { Arrow, CheckoutItemContainer, ImageContainer, Name, Price, Quantity, RemoveButton, Value } from './styles.jsx'
import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems } from '../../selectors/cart';

const CheckoutItem = ({ item }) => {
  const { name, imageUrl, price, quantity } = item
  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch()

  const handleRemoveItemFromCart = () => {
    dispatch(removeItemFromCart(cartItems, item))
  }

  const handleAddItemToCart = () => {
    dispatch(addItemToCart(cartItems, item))
  }

  const handleClearItemFromCart = () => {
    dispatch(clearItemFromCart(cartItems, item))
  }

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <Name>{name}</Name>
      <Quantity>
        <Arrow onClick={handleRemoveItemFromCart}>
          &#10094;
        </Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={handleAddItemToCart}>
          &#10095;
        </Arrow>
      </Quantity>
      <Price>{price}</Price>
      <RemoveButton onClick={handleClearItemFromCart}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem