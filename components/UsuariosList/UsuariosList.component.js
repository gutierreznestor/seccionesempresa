import React from 'react';
import Link from 'next/link';

import ButtonTable from '../ButtonTable/ButtonTable.component';
import { StyledTable } from './UsuariosList.styled';
import { isAllowed } from '../../hocs/auth';
import DataTable from '../DataTable/DataTable.component';

const UsuariosList = ({ list = [], onDelete, readonly, user }) => {
  return (
    <DataTable
      data={list}
      onDelete={onDelete}
      readonly={readonly}
      user={user} />
  );
}

export default UsuariosList;
