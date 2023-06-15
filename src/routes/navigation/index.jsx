import { Outlet } from 'react-router-dom';
import { signOutAuthUser } from '../../utils/firebase';
import { useSelector } from 'react-redux';
import CartIcon from '../../components/cart-icon';
import CartDropdown from '../../components/cart-dropdown';
import { NavigationContainer, LogoContainer, NavLinksContainer, NavLink } from './styles';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { selectCurrentUser } from '../../selectors/user';
import { selectIsCartOpen } from '../../selectors/cart';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  return (
    <>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to='/shop'>SHOP</NavLink>
          {currentUser ?
            <NavLink as='span' onClick={signOutAuthUser}>SIGN OUT</NavLink>
            :
            <NavLink to='/auth'>SIGN IN</NavLink>}
          <CartIcon />
        </NavLinksContainer>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;