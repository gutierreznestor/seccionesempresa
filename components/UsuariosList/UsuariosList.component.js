import React from 'react';
import Link from 'next/link';

import ButtonTable from '../ButtonTable/ButtonTable.component';
import { StyledTable } from './UsuariosList.styled';

const UsuariosList = ({ list = [], onDelete, readonly }) => {
  return (
    <StyledTable>
      <tbody>
        <tr>
          <th>id</th>
          <th>Usuario</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th></th>
        </tr>
        {list.map(({
          idUsuario,
          Usuario,
          Nombre,
          Apellido,
        }) => (
          <tr key={idUsuario}>
            <td>{idUsuario}</td>
            <td>{Usuario}</td>
            <td>{Nombre}</td>
            <td>{Apellido}</td>
            {!readonly && (
              <td>
                <Link href={`usuarios/${idUsuario}`} passHref>
                  <ButtonTable type='Ver' />
                </Link>
                <ButtonTable type='Eliminar' onClick={() => onDelete(idUsuario)} />
              </td>
            )
            }
          </tr>
        ))}
      </tbody>
    </StyledTable>
  )
}

export default UsuariosList;
