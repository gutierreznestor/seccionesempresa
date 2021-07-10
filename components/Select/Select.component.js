import React from 'react';

import { StyledSelect } from './Select.styled';

const Select = ({ options = [], onSelect = () => { }, selected }) => {
  const [selectedValue, setSelectedValue] = React.useState();
  React.useEffect(() => {
    setSelectedValue(selected);
  }, [selected]);
  return (
    <StyledSelect
      value={selectedValue}
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
