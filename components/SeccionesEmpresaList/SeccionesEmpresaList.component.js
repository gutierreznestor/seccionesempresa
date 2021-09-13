import React from 'react';

import DataTable from '../DataTable/DataTable.component';

const SeccionesEmpresaList = ({ list = [], readonly }) => {
  return (
    <DataTable
      data={list}
      path="secciones-empresa/edit/"
      readonly={readonly}
    />
  );
}

export default SeccionesEmpresaList;
