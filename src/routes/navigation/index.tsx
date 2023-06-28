import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../../store/selectors/user';
import { selectIsCartOpen } from '../../store/selectors/cart';
import { signOutStart } from '../../store/reducers/user/actions';
import CartIcon from '../../components/cart-icon';
import CartDropdown from '../../components/cart-dropdown';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import { NavigationContainer, LogoContainer, NavLinksContainer, NavLink } from './styles';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOutStart());
  };

  return (
    <>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to='/shop'>SHOP</NavLink>
          {currentUser ?
            <NavLink as='span' onClick={handleSignOut}>SIGN OUT</NavLink>
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