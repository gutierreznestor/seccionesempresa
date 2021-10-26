import styled from 'styled-components';

const FieldContainer = styled.dl`
  display: flex;
  justify-content: center;
  align-items: center;
  > * {
    flex-basis: 100%;
  }
  dd {
    font-weight: 600;
  }
`;

export default FieldContainer;
