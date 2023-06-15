import { Arrow, CheckoutItemContainer, ImageContainer, Name, Price, Quantity, RemoveButton, Value } from './styles.jsx'
import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart'
import { useDispatch } from 'react-redux'

const CheckoutItem = ({ item }) => {
  const { name, imageUrl, price, quantity } = item

  const dispatch = useDispatch()

  const handleRemoveItemFromCart = () => {
    dispatch(removeItemFromCart(item))
  }

  const handleAddItemToCart = () => {
    dispatch(addItemToCart(item))
  }

  const handleClearItemFromCart = () => {
    dispatch(clearItemFromCart(item))
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