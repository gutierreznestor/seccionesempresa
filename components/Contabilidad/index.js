import React from 'react';
import ListItem from '../ListItem';
import { ContabilidadDiv } from './Contabilidad.styled';

const Contabilidad = () => {
  return (
    <ContabilidadDiv>
      <ListItem title="Apertura ejercicio" description="01/01/2021" />
      <ListItem title="Cierre ejercicio" description="31/12/2021" />
      <ListItem title="Última impresión libro diario" description="15/01/2021" />
    </ContabilidadDiv>
  )
}

export default Contabilidad
