import { FC, InputHTMLAttributes } from 'react';
import { FormInputContainer, FormInputLabel, GroupContainer } from './styles';

type FormInputProps = {
  label: string
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => (
  <GroupContainer>
    <FormInputContainer {...otherProps} />
    {label ? (
      <FormInputLabel shrink={
        Boolean(
          otherProps.value &&
          typeof otherProps.value === 'string' &&
          otherProps.value.length
        )
      }>
        {label}
      </FormInputLabel>
    ) : null}
  </GroupContainer>
);

export default FormInput;