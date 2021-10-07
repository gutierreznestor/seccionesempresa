import React from 'react';
import DataTable from '../DataTable/DataTable.component';

const columnStyles = {
  '0': { width: '200px', textAlign: 'left' },
  '1': { width: '100px' },
  '2': { width: '100px', textAlign: 'right' },
  '3': { width: '100px', textAlign: 'right' },
  '4': { width: '250px', textAlign: 'left' },
  '5': { width: '80px', textAlign: 'right' },
  '6': { width: '100px', textAlign: 'right' },
};

const MayorCuenta = ({ registros = [], user }) => {

  return (
    <DataTable
      allowDelete
      columnStyles={columnStyles}
      data={registros}
      user={user}
      path='asientos'
      readonly
      showViewButton
    />
  )
}

export default MayorCuenta;
