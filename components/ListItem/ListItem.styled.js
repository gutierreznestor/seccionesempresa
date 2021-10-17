import styled from 'styled-components';

export const FieldContainer = styled.dl`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 200px;
  > * {
    flex-basis: 100%;    
  }
  dd {
    font-weight: 600;
  }
  dt {
    text-align: right;
  }
`;
