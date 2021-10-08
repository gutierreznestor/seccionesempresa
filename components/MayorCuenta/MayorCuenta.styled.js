import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

export const CuentaDiv = styled.div`
  display: flex;
  width: 100%;
  dl {
    font-size: 1.3rem;
    dd: nth-child(2) {
      margin-inline-start: 10px;
    }
  }
  dl: nth-child(2) {
    dd: nth-child(2) {
      min-width: 400px;
    }
  }
`;
