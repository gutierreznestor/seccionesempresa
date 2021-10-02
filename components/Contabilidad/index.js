import React from 'react';
import { formatDate } from '../../helpers/dates';
import { useSelectContabilidad } from '../../selectors';
import ListItem from '../ListItem';
import { ContabilidadDiv } from './Contabilidad.styled';


const Contabilidad = () => {
  const { currentContabilidad } = useSelectContabilidad();
  return (
    <ContabilidadDiv>
      {currentContabilidad && (
        <>
          <ListItem title="Nombre empresa" description={currentContabilidad?.NombreEmpresa} />
          <ListItem title="Apertura ejercicio" description={formatDate({ date: currentContabilidad?.AperturaEjercicio })} />
          <ListItem title="Cierre ejercicio" description={formatDate({ date: currentContabilidad?.CierreEjercicio })} />
          <ListItem title="Última impresión libro diario" description={formatDate({ date: currentContabilidad?.UltimaEmisionLibroDiario })} />
        </>
      )}
    </ContabilidadDiv>
  )
}

export default Contabilidad
