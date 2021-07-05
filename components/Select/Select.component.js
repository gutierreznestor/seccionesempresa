import React from 'react';

import { StyledSelect } from './Select.styled';

const Select = ({ options = [], onSelect = () => { } }) => {
  return (
    <StyledSelect
      onChange={(e) => onSelect(e.target.value)}
      name='empresa'
      id='empresa'>
      {options.map(({ label, value }) => {
        return <option value={value} key={value}>{label}</option>
      })};
    </StyledSelect>
  )
}

export default Select;
