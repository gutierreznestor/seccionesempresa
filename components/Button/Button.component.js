import React from 'react';

import { StyledButton } from './Button.styled';

const Button = React.forwardRef(({ label = 'button', type = 'button' }, ref) => {
  return (
    <StyledButton type={type} ref={ref}>
      {label}
    </StyledButton>
  )
});

export default Button;
