import React from 'react';

import { StyledButton } from './Button.styled';

const Button = ({ label = 'button', type = 'button' }) => {
  return (
    <StyledButton type={type}>
      {label}
    </StyledButton>
  )
}

export default Button;
