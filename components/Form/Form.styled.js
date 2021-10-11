import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #f2f2f2;
  margin-bottom: 20px;
  width: 1200px;
  flex-direction: row;
  flex-grow: 0;
  flex-wrap: wrap;
`;

export const ErrorField = styled.span`
  color: #ef3210;
  margin: 0 0 10px 0;
`;

export const StyledInputLabel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
`;

export const StyledLabel = styled.label`
  margin: 3px 0;
`;

export const WatchValueDiv = styled.div`
  margin: 3px 0;
  color: #0580fa;
  font-weight: 600;
  font-size: 1.1rem;
`;

export const InputHelperContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const InputErrorWatchContainer = styled.div`
  display: flex;
  flex-direction: column;
  `;

export const FormFieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
`;