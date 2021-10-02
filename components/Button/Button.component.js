import React from 'react';

import { StyledButton } from './Button.styled';

/**
 * @param {boolean} disabled
 * @param {string} label
 * @param {string} type
 * @param {function} onClick
 */
const Button = React.forwardRef(({
  disabled = false,
  label = 'button',
  type = 'button',
  onClick = () => { },
}, ref) => {
  return (
    <StyledButton type={type} ref={ref} onClick={onClick} disabled={disabled}>
      {label}
    </StyledButton>
  )
});

export default Button;
