import {
  signInWithGooglePopup,
  createUserDocumentFromAuth
} from '../../utils/firebase/firebase';
import SignUpForm from '../../components/sign-up-form';
import Button from '../../components/button';
import './sign-in.scss';

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userRef = await createUserDocumentFromAuth(user);
  };

  return (
    <>
      <div className='sign-in'>
        <h1>Sign In</h1>
        <Button onClick={logGoogleUser} buttonType="google">Sign in with Google Popup</Button>
      </div>
      <SignUpForm />
    </>
  );
};

export default SignIn;