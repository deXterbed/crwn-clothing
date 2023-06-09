import { FormInputContainer, FormInputLabel, GroupContainer } from './styles.jsx';

const FormInput = ({ label, ...otherProps }) => (
  <GroupContainer>
    <FormInputContainer {...otherProps} />
    {label ? (
      <FormInputLabel shrink={otherProps.value.length}>
        {label}
      </FormInputLabel>
    ) : null}
  </GroupContainer>
);

export default FormInput;