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
              <>
                <Link href={`usuarios/edit/${idUsuario}`} passHref>
                  <ButtonTable type='Editar' />
                </Link>
                <ButtonTable type='Eliminar' onClick={() => onDelete(idUsuario)} />
              </>
            )
            }
          </tr>
        ))}
      </tbody>
    </StyledTable>
  )
}

export default UsuariosList;
