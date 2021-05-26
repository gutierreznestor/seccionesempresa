import React from 'react';

import { StyledDeleteButton, StyledEditButton } from './ButtonTable.styled';

const ButtonTable = ({ type = 'Eliminar' }) => {
  const deleteButton = <StyledDeleteButton title='Eliminar'>Eliminar</StyledDeleteButton>;
  const modifyButton = <StyledEditButton title='Editar'>Editar</StyledEditButton>;
  return type === 'Eliminar' ? deleteButton : modifyButton;
}

export default ButtonTable;
