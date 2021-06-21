import React from 'react';

import { StyledButton } from './Button.styled';

const Button = React.forwardRef(({ label = 'button', type = 'button', onClick = () => { } }, ref) => {
  return (
    <StyledButton type={type} ref={ref} onClick={onClick}>
      {label}
    </StyledButton>
  )
});

export default Button;
