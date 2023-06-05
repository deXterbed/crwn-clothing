import React, { useContext } from 'react'
import { CartContext } from '../../contexts/cart-context'
import './checkout-item.scss'

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
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={name} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow' onClick={handleRemoveItemFromCart}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={handleAddItemToCart}>
          &#10095;
        </div>
      </span>
      <span className='price'>{price}</span>
      <div className='remove-button' onClick={handleClearItemFromCart}>&#10005;</div>
    </div>
  )
}

export default CheckoutItem