import { useState } from 'react';
import { useDispatch } from 'react-redux';
import FormInput from '../form-input';
import Button from '../button';
import { SignUpContainer } from './styles';
import { emailSignUpStart } from '../../store/reducers/user';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  passwordConfirmation: ''
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, passwordConfirmation } = formFields;
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== passwordConfirmation) {
      alert('Passwords do not match');
      return;
    }

    dispatch(emailSignUpStart(email, password, displayName));
    resetFormFields();
  };

  return (
    <SignUpContainer>
      <h2>I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <div>
          <FormInput onChange={handleChange} label="Display Name" name="displayName" type="text" value={displayName} required />
        </div>
        <div>
          <FormInput onChange={handleChange} label="Email" name="email" type="email" value={email} required />
        </div>
        <div>
          <FormInput onChange={handleChange} label="Password" name="password" type="password" value={password} required />
        </div>
        <div>
          <FormInput onChange={handleChange} label="Password Confirmation" name="passwordConfirmation" type="password" value={passwordConfirmation} required />
        </div>
        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
}

export default SignUpForm;