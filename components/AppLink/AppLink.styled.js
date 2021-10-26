import styled, { css } from 'styled-components';

export const StyledAnchor = styled.button(
  ({ disabled, bgColor = '#fff', color = '#444444' }) => css`
    min-width: 100px;
    padding: 5px;
    margin: 10px 0;
    border-radius: 5px;
    background-color: ${bgColor};
    color: ${color};
    &:hover {
      cursor: ${disabled ? 'not-allowed' : 'pointer'};
      background-color: ${disabled ? '#fff' : '#f2f2f2'};
      outline: ${disabled ? '' : '1px solid #888'};
    }
  `,
)