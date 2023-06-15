import { useDispatch } from 'react-redux';
import Button, { BUTTON_TYPE_CLASSES } from '../button';
import { FooterContainer, NameContainer, PriceContainer, ProductCardContainer } from './styles.jsx';
import { addItemToCart } from '../../store/cart';

const ProductCard = ({ product }) => {
  const { name, imageUrl, price } = product;

  const dispatch = useDispatch();

  const addProductToCart = () => dispatch(addItemToCart(product));

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={name} />
      <FooterContainer>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>{price}</PriceContainer>
      </FooterContainer>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>
    </ProductCardContainer>
  );
}

export default ProductCard;