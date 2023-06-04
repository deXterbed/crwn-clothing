import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase';
import './sign-up-form.scss';
import FormInput from '../form-input';
import Button from '../button';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  passwordConfirmation: ''
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, passwordConfirmation } = formFields;

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
    try {
      const user = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  };

  return (
    <div className="sign-up-container">
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
    </div>
  );
}

export default SignUpForm;