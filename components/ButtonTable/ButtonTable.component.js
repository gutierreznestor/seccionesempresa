import React, { forwardRef } from 'react';

import { StyledDeleteButton, StyledEditButton } from './ButtonTable.styled';

const ButtonTable = forwardRef(({ type = 'Eliminar', onClick }, ref) => {
  const deleteButton = <StyledDeleteButton title='Eliminar' onClick={onClick} >Eliminar</StyledDeleteButton>;
  const modifyButton = <StyledEditButton title='Editar' onClick={onClick} >Editar</StyledEditButton>;
  return type === 'Eliminar' ? deleteButton : modifyButton;
});

export default ButtonTable;
