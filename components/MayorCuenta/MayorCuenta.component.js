import React from 'react';
import DataTable from '../DataTable/DataTable.component';
import { Container, CuentaDiv } from './MayorCuenta.styled';
import ListItem from '../ListItem';

const columnStyles = {
  '0': { width: '60px', textAlign: 'right' },
  '1': { width: '60px', textAlign: 'right' },
  '2': { width: '100px', textAlign: 'right' },
  '3': { width: '100px', textAlign: 'right' },
  '4': { width: '100px', textAlign: 'left' },
  '5': { width: '250px', textAlign: 'left' },
  '6': { width: '100px', textAlign: 'right' },
  '7': { width: '100px', textAlign: 'right' },
  '8': { width: '100px', textAlign: 'right' },
};

/**
 * 
 * @param {object} cuenta
 * @param {array} registros
 * @param {object} user
 */
const MayorCuenta = ({ cuenta = {}, registros = [], user }) => {

  return (
    <Container>
      <CuentaDiv>
        <ListItem title='Id' description={cuenta.id} />
        <ListItem title='Cuenta' description={cuenta.Nombre} />
        <ListItem title='Código' description={cuenta.CodigoPlan} />
      </CuentaDiv>
      <DataTable
        allowDelete
        columnStyles={columnStyles}
        data={registros}
        user={user}
        path='asientos'
        readonly
        showViewButton
      />
    </Container>
  )
}

export default MayorCuenta;
