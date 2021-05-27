import React from 'react';
import { useForm } from 'react-hook-form';

import Input from '../Input/input.component';
import Button from '../Button/Button.component';
import {
  StyledForm,
  ErrorField,
  StyledInputLabel,
  StyledLabel,
} from './Form.styled'

const Form = ({
  onFormSubmit,
  config = [],
  buttonLabel = 'Agregar',
  defaultValues = {},
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { ...defaultValues } });

  const onSubmit = data => {
    onFormSubmit(data);
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      { config.map(({
        label,
        type,
        name,
        placeholder,
        validations,
        textValidation,
      }) => (
        <StyledInputLabel key={name}>
          <StyledLabel>{label}</StyledLabel>
          <Input
            type={type}
            placeholder={placeholder}
            {...register(name, { ...validations })}
          />
          {errors[name] && <ErrorField>{textValidation}</ErrorField>}
        </StyledInputLabel>
      ))}
      <Button type="submit" label={buttonLabel} />
    </StyledForm>
  )
}

export default Form;
