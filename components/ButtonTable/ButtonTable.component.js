import React, { forwardRef } from 'react';

import { StyledDeleteButton, StyledEditButton } from './ButtonTable.styled';


const ButtonTable = forwardRef(({ type = 'Ver', onClick }, ref) => {
  const buttons = {
    'Eliminar': <StyledDeleteButton title='Eliminar' onClick={onClick} >Eliminar</StyledDeleteButton>,
    'Editar': <StyledEditButton title='Editar' onClick={onClick} >Editar</StyledEditButton>,
    'Ver': <StyledEditButton title='Ver' onClick={onClick} >Ver</StyledEditButton>,
    'Agregar': <StyledEditButton title='Agregar' onClick={onClick} >Agregar</StyledEditButton>,
    'Quitar': <StyledDeleteButton title='Quitar' onClick={onClick} >Quitar</StyledDeleteButton>,
  }
  return buttons[type];
});

export default ButtonTable;
