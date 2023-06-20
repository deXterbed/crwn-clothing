import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
  ButtonSpinnerContainer
} from './styles.jsx';

export const BUTTON_TYPE_CLASSES = {
  base: 'base',
  google: 'google-sign-in',
  inverted: 'inverted'
};

const Button = ({ children, buttonType = BUTTON_TYPE_CLASSES.base, isLoading, ...otherProps }) => {
  const CustomButton = {
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton
  }[buttonType]

  return (
    <CustomButton disabled={isLoading} {...otherProps}>
      {isLoading ? <ButtonSpinnerContainer /> : children}
    </CustomButton>
  );
};

export default Button;