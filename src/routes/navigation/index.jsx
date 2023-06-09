import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { signOutAuthUser } from '../../utils/firebase/firebase';
import { UserContext } from '../../contexts/user-context';
import { CartContext } from '../../contexts/cart-context'
import CartIcon from '../../components/cart-icon';
import CartDropdown from '../../components/cart-dropdown';
import { NavigationContainer, LogoContainer, NavLinksContainer, NavLink } from './styles';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

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