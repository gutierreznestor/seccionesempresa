import React from 'react';
import DataTable from '../DataTable/DataTable.component';

const MayorCuenta = ({ registros = [], user }) => {
  return (
    <DataTable
      allowDelete
      data={registros}
      user={user}
      path='asientos'
      readonly
      showViewButton
    />
  )
}

export default MayorCuenta;
