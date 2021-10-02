import React from 'react';

import { ErrorContainer } from './ErrorMessage.styled';

const ErrorMessage = React.forwardRef(({ message = '' }, ref) => (
  <ErrorContainer ref={ref}>
    {message}
  </ErrorContainer>
));

export default ErrorMessage;
