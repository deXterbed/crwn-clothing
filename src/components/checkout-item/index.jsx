import React, { useContext } from 'react'
import { CartContext } from '../../contexts/cart-context'
import { Arrow, CheckoutItemContainer, ImageContainer, Name, Price, Quantity, RemoveButton, Value } from './styles.jsx'

const CheckoutItem = ({ item }) => {
  const { name, imageUrl, price, quantity } = item
  const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext)

  const handleRemoveItemFromCart = () => {
    removeItemFromCart(item)
  }

  const handleAddItemToCart = () => {
    addItemToCart(item)
  }

  const handleClearItemFromCart = () => {
    clearItemFromCart(item)
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