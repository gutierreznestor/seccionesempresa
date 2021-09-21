import React from 'react';
import { StyledInput } from './input.styled';

const Input = React.forwardRef(({
  defaultValue = '',
  max,
  min,
  name,
  step = 1,
  type,
  ...props
}, ref) => {
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
