import React from 'react';
import { StyledInput } from './input.styled';

const Input = React.forwardRef(({ type, name, defaultValue = '', ...props }, ref) => {
  return (
    <StyledInput
      defaultValue={defaultValue}
      name={name}
      type={type}
      ref={ref}
      {...props} />
  )
});

export default Input;
