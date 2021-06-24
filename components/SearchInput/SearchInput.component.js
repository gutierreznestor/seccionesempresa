import React from 'react';
import { StyledSearchInput } from './SearchInput.styled';

const Input = React.forwardRef(({ type, name, value = '', onChange, ...props }, ref) => {
  return (
    <StyledSearchInput
      value={value}
      id={name}
      name={name}
      type={type}
      ref={ref}
      onChange={(e) => onChange(e.target.value)}
      {...props} />
  )
});

export default Input;
