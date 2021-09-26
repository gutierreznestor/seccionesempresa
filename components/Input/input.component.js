import React from 'react';
import DatePicker from "react-datepicker";
import { Controller } from 'react-hook-form';
import { StyledInput } from './input.styled';

const Input = React.forwardRef(({
  defaultValue = '',
  max,
  min,
  name,
  step = 1,
  type,
  control,
  ...props
}, ref) => {
  if (type === 'date') {
    return (
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            selected={value}
            onChange={(e) => onChange(e)}
            dateFormat="dd-MM-yyyy"
            placeholder={{ ...props }}
          />)}
        {...props}
      />);
  }
  return (
    <StyledInput
      defaultValue={defaultValue}
      id={name}
      name={name}
      max={max}
      min={min}
      ref={ref}
      step={step}
      type={type}
      {...props} />
  )
});

export default Input;
