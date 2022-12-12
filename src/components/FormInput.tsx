import React from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
} from '@chakra-ui/react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { InputData } from '../pages/contact';

interface FormInputProps extends InputProps {
  inputName: keyof InputData;
  label: string;
  errors: FieldError | undefined;
  helperText?: string;
  register: UseFormRegister<InputData>;
}

const FormInput: React.FC<FormInputProps> = ({
  inputName,
  label,
  errors,
  helperText,
  register,
  ...rest
}) => (
  <FormControl isRequired isInvalid={!!errors?.message}>
    <FormLabel htmlFor={inputName}>{label}</FormLabel>
    <Input
      id={inputName}
      {...rest}
      {...register(inputName)}
      aria-invalid={!!errors?.message}
    />
    {!errors?.message ? (
      helperText && <FormHelperText>{helperText}</FormHelperText>
    ) : (
      <FormErrorMessage>{errors?.message}</FormErrorMessage>
    )}
  </FormControl>
);

FormInput.defaultProps = {
  helperText: '',
};

export default FormInput;
