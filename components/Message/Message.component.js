import React from 'react';
import { StyledMessage } from './Message.styled'

const Message = ({ children }) => {
  return (
    <StyledMessage>
      {children}
    </StyledMessage>
  )
}

export default Message
