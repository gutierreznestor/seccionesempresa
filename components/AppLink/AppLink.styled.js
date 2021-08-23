import styled, { css } from 'styled-components';

export const StyledAnchor = styled.button(
  ({ disabled, bgColor }) => css`
    min-width: 100px;
    padding: 5px;
    margin: 10px 0;
    border-radius: 5px;
    background-color: ${bgColor};
    color: #ffffff;
    &:hover {
      cursor: ${disabled ? 'not-allowed' : 'pointer'};
    }
  `,
)