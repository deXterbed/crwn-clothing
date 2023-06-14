import { useState } from 'react';
import FormInput from '../../components/form-input';
import Button, { BUTTON_TYPE_CLASSES } from '../../components/button';
import { ButtonsContainer, SignInContainer } from './styles';
import { useDispatch } from 'react-redux';
import { emailSignInStart, googleSignInStart } from '../../store/reducers/user';

const defaultFormFields = {
  email: '',
  password: ''
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const dispatch = useDispatch();

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(emailSignInStart(email, password));
    resetFormFields();
  };

  return (
    <SignInContainer>
      <h2>I already have an account</h2>
      <span>Sign in with email and password</span>
      <form onSubmit={handleSubmit}>
        <div>
          <FormInput onChange={handleChange} label="Email" name="email" type="email" value={email} required />
        </div>
        <div>
          <FormInput onChange={handleChange} label="Password" name="password" type="password" value={password} required />
        </div>
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>Google Sign in</Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
}

export default SignInForm;