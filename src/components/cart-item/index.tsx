import { FC } from 'react'
import { CartItemContainer, ItemDetailsContainer, NameContainer, PriceContainer } from './styles'

type CartItemProps = {
  item: {
    imageUrl: string
    price: number
    name: string
    quantity: number
  }
}

const CartItem: FC<CartItemProps> = ({ item: { imageUrl, price, name, quantity } }) => {
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