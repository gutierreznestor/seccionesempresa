import React from 'react';
import DataTable from '../DataTable/DataTable.component';
import { Container, CuentaDiv } from './AsientoLibroDiario.styled';
import ListItem from '../ListItem';

const columnStyles = {
  '0': { width: '60px', textAlign: 'right' },
  '1': { width: '250px', textAlign: 'left' },
  '2': { width: '100px', textAlign: 'right' },
  '3': { width: '60px', textAlign: 'right' },
  '4': { width: '60px', textAlign: 'right' },
  '5': { width: '250px', textAlign: 'left' },
  '6': { width: '60px', textAlign: 'right' },
  '7': { width: '60px', textAlign: 'right' },
};

/**
 * 
 * @param {object} libro
 * @param {object} user
 */
const AsientoLibroDiario = ({ libro, user }) => {
  return (
    <Container>
      <CuentaDiv>
        <ListItem title='Fecha' description={libro.Fecha} />
        <ListItem title='Nro. Asiento' description={libro.Numero} />
      </CuentaDiv>
      <DataTable
        allowDelete
        columnStyles={columnStyles}
        data={libro.Renglones}
        user={user}
        path='asientos'
        readonly
        showViewButton
      />
    </Container>
  )
}

export default AsientoLibroDiario;
