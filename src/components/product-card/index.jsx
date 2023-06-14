import { useDispatch, useSelector } from 'react-redux';
import Button, { BUTTON_TYPE_CLASSES } from '../button';
import { FooterContainer, NameContainer, PriceContainer, ProductCardContainer } from './styles.jsx';
import { addItemToCart } from '../../store/reducers/cart';
import { selectCartItems } from '../../store/selectors/cart';


const ProductCard = ({ product }) => {
  const { name, imageUrl, price } = product;
  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch();

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

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