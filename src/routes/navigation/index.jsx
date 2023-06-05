import { Link, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { signOutAuthUser } from '../../utils/firebase/firebase';
import { UserContext } from '../../contexts/user-context';
import { CartContext } from '../../contexts/cart-context'
import CartIcon from '../../components/cart-icon';
import CartDropdown from '../../components/cart-dropdown';
import './navigation.scss';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <CrwnLogo className='logo' />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>SHOP</Link>
          {
            currentUser ?
              <div className='nav-link' onClick={signOutAuthUser}>SIGN OUT</div>
              :
              <Link className='nav-link' to='/auth'>SIGN IN</Link>
          }
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;