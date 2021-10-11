import styled, { css } from 'styled-components';

export const StyledInput = styled.input(
  ({ type }) => {
    return css`
      padding: 5px;
      margin: 5px 0;
      border-radius: 3px;
      border: none;
      width: ${type === 'number' || type === 'date' ? '50px' : ''}
    `
  },
);