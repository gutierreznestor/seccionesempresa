import React from 'react';
import Link from 'next/link';

import ButtonTable from './ButtonTable/ButtonTable.component';
import { StyledTable } from './EmpleadosList.styled';

const EmpleadosList = ({ list = [], onDelete, onEdit }) => {
  return (
    <StyledTable>
      <tbody>
        <tr>
          <th>id</th>
          <th>Sección</th>
          <th>id</th>
          <th>Nombre</th>
          <th>Apellido</th>
        </tr>
        {list.map(({
          idEmpleado,
          Nombre,
          Apellido,
          idSeccionEmpresa,
          Seccion
        }) => (
          <tr key={idEmpleado}>
            <td>{idSeccionEmpresa}</td>
            <td>{Seccion}</td>
            <td>{idEmpleado}</td>
            <td>{Nombre}</td>
            <td>{Apellido}</td>
            <Link href={`empleados/edit/${idEmpleado}`} passHref>
              <ButtonTable type='Editar' onClick={() => onEdit(idEmpleado)} />
            </Link>
            <ButtonTable type='Eliminar' onClick={() => onDelete(idEmpleado)} />
          </tr>
        ))}
      </tbody>
    </StyledTable>
  )
}

export default EmpleadosList;
