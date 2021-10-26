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
  SubmitButtonContainer,
  WatchValueDiv,
} from './Form.styled'

const Form = ({
  buttonLabel = 'Agregar',
  buttonStyles = {},
  children,
  config = [],
  defaultValues = {},
  formStyle = {},
  handleWatcherFecha = () => { },
  helpers = [],
  hideButton = false,
  onFormSubmit,
  watcher = '',
  watcherFecha = 'Fecha',
  watching = () => { },
  watchValue = '',
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm({ defaultValues: { ...defaultValues } });
  const onSubmit = data => {
    onFormSubmit(data);
  }

  const field = watch(watcher);

  const fechaAsiento = watch(watcherFecha);

  useEffect(() => {
    setValue('FechaOperacion', defaultValues.FechaOperacion);
    setValue('FechaVencimiento', defaultValues.FechaVencimiento);
  }, [defaultValues.FechaOperacion]);

  useEffect(() => {
    if (fechaAsiento) {
      handleWatcherFecha(fechaAsiento);
    }
  }, [fechaAsiento]);

  useEffect(() => {
    watching(field)
  }, [field]);

  const getHelper = (name) => {
    const helper = helpers.find(helper => helper.name === name);
    return helper ? helper.component : '';
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)} formStyle={formStyle}>
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
        <FormFieldContainer key={name}>
          <StyledInputLabel>
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
            {getHelper(name)}
          </StyledInputLabel>
        </FormFieldContainer>
      ))}
      {children}
      {hideButton ? '' : (
        <SubmitButtonContainer>
          <Button type="submit" label={buttonLabel} style={buttonStyles} />
        </SubmitButtonContainer>
      )}
    </StyledForm>
  )
}

export default Form;
