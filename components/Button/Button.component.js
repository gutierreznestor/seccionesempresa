import React from 'react';

import { StyledButton } from './Button.styled';

/**
 * @param {boolean} disabled
 * @param {string} label
 * @param {string} type
 * @param {function} onClick
 * @param {object} style
 */
const Button = React.forwardRef(({
  disabled = false,
  label = 'button',
  type = 'button',
  onClick = () => { },
  style = {},
}, ref) => {
  return (
    <StyledButton
      style={{ ...style }}
      type={type}
      ref={ref}
      onClick={onClick}
      disabled={disabled}>
      {label}
    </StyledButton>
  )
});

export default Button;
