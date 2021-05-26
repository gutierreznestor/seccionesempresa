import React from 'react';
import Link from 'next/link';
import AppLink from './AppLink/AppLink.component';

import ButtonTable from './ButtonTable/ButtonTable.component';

const SeccionesEmpresaList = ({ list = [], onDelete, onEdit }) => {

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
            <Link href='secciones-empresa/edit' passHref>
              <ButtonTable type='Editar' onClick={() => onEdit(idSeccionEmpresa)} />
            </Link>
            <ButtonTable type='Eliminar' onClick={() => onDelete(idSeccionEmpresa)} />
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SeccionesEmpresaList;
