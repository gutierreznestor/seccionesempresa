import React from 'react';
import Link from 'next/link';

import ButtonTable from '../ButtonTable/ButtonTable.component';
import { StyledTable } from './EmpleadosList.styled';

const EmpleadosList = ({ list = [], onDelete, readonly }) => {
  return (
    <StyledTable>
      <tbody>
        <tr>
          <th>id</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>id</th>
          <th>Sección</th>
        </tr>
        {list.map(({
          idEmpleado,
          Nombre,
          Apellido,
          idSeccionEmpresa,
          Seccion
        }) => (
          <tr key={idEmpleado}>
            <td>{idEmpleado}</td>
            <td>{Nombre}</td>
            <td>{Apellido}</td>
            <td>{idSeccionEmpresa}</td>
            <td>{Seccion}</td>
            {!readonly && (
              <td>
                <Link href={`empleados/edit/${idEmpleado}`} passHref>
                  <ButtonTable type='Editar' />
                </Link>
                <ButtonTable type='Eliminar' onClick={() => onDelete(idEmpleado)} />
              </td>
            )
            }
          </tr>
        ))}
      </tbody>
    </StyledTable>
  )
}

export default EmpleadosList;
