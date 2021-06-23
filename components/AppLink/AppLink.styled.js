import styled, { css } from 'styled-components';

export const StyledAnchor = styled.button(
  ({ disabled }) => css`
    min-width: 100px;
    padding: 5px;
    margin: 10px 0;
    border-radius: 5px;
    background-color: #40c51f;
    color: #fff;
    &:hover {
      cursor: ${disabled ? 'not-allowed' : 'pointer'};
    }
  `,
)