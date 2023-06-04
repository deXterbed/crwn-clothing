import { Link, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { signOutAuthUser } from '../../utils/firebase/firebase';
import { UserContext } from '../../contexts/user-context';
import './navigation.scss';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const signOutHandler = async () => {
    await signOutAuthUser();
    setCurrentUser(null);
  };

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
              <div className='nav-link' onClick={signOutHandler}>SIGN OUT</div>
              :
              <Link className='nav-link' to='/auth'>SIGN IN</Link>
          }
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;