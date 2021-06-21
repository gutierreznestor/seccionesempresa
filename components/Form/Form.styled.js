import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
  width: 400px;
  margin-bottom: 20px;
`;

export const ErrorField = styled.span`
  color: #ef3210;
  margin: 0 0 10px 0;
`;

export const StyledInputLabel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 10px 0px;
`;

export const StyledLabel = styled.label`
  margin: 3px 0;
`;