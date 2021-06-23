import React from 'react';
import Link from 'next/link';

import ButtonTable from '../ButtonTable/ButtonTable.component';

const PerfilesList = ({ list = [], onDelete, readonly }) => {

  return (
    <table>
      <tbody>
        <tr>
          <th>id</th>
          <th>Perfil</th>
        </tr>
        {list.map(({ idPerfil, Nombre }) => (
          <tr key={idPerfil}>
            <td>{idPerfil}</td>
            <td>{Nombre}</td>
            {!readonly && (
              <td>
                <Link href={`perfiles/edit/${idPerfil}`} passHref>
                  <ButtonTable type='Editar' />
                </Link>
                <ButtonTable type='Eliminar' onClick={() => onDelete(idPerfil)} />
              </td>
            )

            }

          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default PerfilesList;
