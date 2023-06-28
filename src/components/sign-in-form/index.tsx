import { useState, ChangeEvent, FormEvent  } from 'react';
import FormInput from '../form-input';
import Button, { BUTTON_TYPE_CLASSES } from '../button';
import { ButtonsContainer, SignInContainer } from './styles';
import { useDispatch } from 'react-redux';
import { emailSignInStart, googleSignInStart } from '../../store/reducers/user/actions';

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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