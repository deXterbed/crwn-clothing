import Button, { BUTTON_TYPE_CLASSES } from '../button';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart-context';
import { FooterContainer, NameContainer, PriceContainer, ProductCardContainer } from './styles.jsx';

const ProductCard = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);
  const { name, imageUrl, price } = product;
  const addProductToCart = () => addItemToCart(product);
  return (
    <ProductCardContainer>
      <img src={imageUrl} />
      <FooterContainer>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>{price}</PriceContainer>
      </FooterContainer>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>
    </ProductCardContainer>
  );
}

export default ProductCard;