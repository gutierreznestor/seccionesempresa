import styled, { css } from 'styled-components';

export const StyledButton = styled.button(
  ({ disabled }) => css`
    padding: 5px;
    background-color: #248ddb;
    color: #f2f2f2;
    border-radius: 5px;
    border: none;
    &:hover {
      cursor: ${disabled ? 'not-allowed' : 'pointer'};
    }
  `,
);