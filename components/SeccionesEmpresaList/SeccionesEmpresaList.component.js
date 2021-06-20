import React from 'react';
import Link from 'next/link';

import ButtonTable from '../ButtonTable/ButtonTable.component';

const SeccionesEmpresaList = ({ list = [], onDelete, readonly }) => {

  return (
    <table>
      <tbody>
        <tr>
          <th>id</th>
          <th>Sección</th>
        </tr>
        {list.map(({ idSeccionEmpresa, Nombre }) => (
          <tr key={idSeccionEmpresa}>
            <td>{idSeccionEmpresa}</td>
            <td>{Nombre}</td>
            {!readonly && (
              <td>
                <Link href={`secciones-empresa/edit/${idSeccionEmpresa}`} passHref>
                  <ButtonTable type='Editar' />
                </Link>
                <ButtonTable type='Eliminar' onClick={() => onDelete(idSeccionEmpresa)} />
              </td>
            )

            }

          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SeccionesEmpresaList;
