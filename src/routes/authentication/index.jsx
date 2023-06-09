import SignUpForm from '../../components/sign-up-form';
import SignInForm from '../../components/sign-in-form';
import './styles.jsx'
import { AuthenticationContainer } from './styles.jsx';

const Authentication = () => {
  return (
    <AuthenticationContainer>
      <SignInForm />
      <SignUpForm />
    </AuthenticationContainer>
  );
};

export default Authentication;