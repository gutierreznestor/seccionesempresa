import React, { forwardRef } from 'react';

import { StyledDeleteButton, StyledEditButton } from './ButtonTable.styled';


const ButtonTable = forwardRef(({ type = 'Ver', onClick, enabled = true }, ref) => {
  const buttons = {
    'Eliminar': <StyledDeleteButton title='Eliminar' onClick={onClick} disabled={!enabled} >Eliminar</StyledDeleteButton>,
    'Editar': <StyledEditButton title='Editar' onClick={onClick} disabled={!enabled} >Editar</StyledEditButton>,
    'Ver': <StyledEditButton title='Ver' onClick={onClick} disabled={!enabled} >Ver</StyledEditButton>,
    'Agregar': <StyledEditButton title='Agregar' onClick={onClick} disabled={!enabled} >Agregar</StyledEditButton>,
    'Quitar': <StyledDeleteButton title='Quitar' onClick={onClick} disabled={!enabled} >Quitar</StyledDeleteButton>,
  }
  return buttons[type];
});

export default ButtonTable;
