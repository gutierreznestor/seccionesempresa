import styled, { css } from 'styled-components';

export const TableContainer = styled.table(
  ({ tableStyle = { marginTop: '20px' } }) => css`
  ${tableStyle}
`);