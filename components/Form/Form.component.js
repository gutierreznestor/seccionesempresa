import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Input from '../Input/input.component';
import Button from '../Button/Button.component';
import {
  ErrorField,
  FormFieldContainer,
  InputErrorWatchContainer,
  InputHelperContainer,
  StyledForm,
  StyledInputLabel,
  StyledLabel,
  WatchValueDiv,
} from './Form.styled'

const Form = ({
  onFormSubmit,
  children,
  config = [],
  buttonLabel = 'Agregar',
  defaultValues = {},
  helpers,
  watcher = '',
  watching = () => { },
  watchValue = '',
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ defaultValues: { ...defaultValues } });

  const onSubmit = data => {
    onFormSubmit(data);
  }

  const field = watch(watcher);

  useEffect(() => {
    watching(field)
  }, [field]);

  const getHelper = (name) => {
    const helper = helpers.find(helper => helper.name === name);
    return helper ? helper.component : '';
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      {config.map(({
        label,
        type,
        max,
        min,
        name,
        placeholder,
        step,
        textValidation,
        validations,
      }) => (
        <FormFieldContainer>
          <StyledInputLabel key={name}>
            <StyledLabel>{label}</StyledLabel>
            <InputHelperContainer>
              <InputErrorWatchContainer>
                <Input
                  max={max}
                  min={min}
                  type={type}
                  step={step}
                  placeholder={placeholder}
                  control={control}
                  {...register(name, { ...validations })}
                />
                {watcher === name && watchValue && <WatchValueDiv>{watchValue}</WatchValueDiv>}
                {errors[name] && <ErrorField>{textValidation}</ErrorField>}
              </InputErrorWatchContainer>
            </InputHelperContainer>
          </StyledInputLabel>
          {getHelper(name)}
        </FormFieldContainer>
      ))}
      {children}
      <Button type="submit" label={buttonLabel} />
    </StyledForm>
  )
}

export default Form;
