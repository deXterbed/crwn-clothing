import { CartItemContainer, ItemDetailsContainer, NameContainer, PriceContainer } from './styles.jsx'

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => {
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={name} />
      <ItemDetailsContainer>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>{quantity} x {price}</PriceContainer>
      </ItemDetailsContainer>
    </CartItemContainer>
  )
}

export default CartItem