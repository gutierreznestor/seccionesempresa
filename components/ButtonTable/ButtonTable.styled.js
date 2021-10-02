import styled, { css } from 'styled-components';

export const StyledDeleteButton = styled.button(
  ({ disabled }) => css`
    background-color: #b13453;
    color: #f2f2f2;
    font-size: 0.7rem;
    &:hover {
      cursor: ${disabled ? 'not-allowed' : 'pointer'}; 
    }
  `,
);

export const StyledEditButton = styled.button(
  ({ disabled }) => css`
    background-color: #248ddb;
    color: #f2f2f2;
    font-size: 0.7rem;
    &:hover {
      cursor: ${disabled ? 'not-allowed' : 'pointer'}; 
    }
  `,
);