import React from 'react';

import { StyledTable } from './LogsEmpleadosList.styled';

const LogsEmpleadosList = ({ list = [] }) => {
  return (
    <>
      <h1>
        Logs empleados
      </h1>
      <StyledTable>
        <tbody>
          <tr>
            <th>id</th>
            <th>Creado</th>
            <th>idUsuario</th>
            <th>Usuario</th>
            <th>Operación</th>
            <th>Descripción</th>
          </tr>
          {list.map(({
            idLogUsuario,
            Creado,
            idUsuario,
            Usuario,
            Operacion,
            Descripcion
          }) => (
            <tr key={idLogUsuario}>
              <td>{idLogUsuario}</td>
              <td>{new Date(Creado).toLocaleString()}</td>
              <td>{idUsuario}</td>
              <td>{Usuario}</td>
              <td>{Operacion}</td>
              <td>{Descripcion}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </>
  )
}

export default LogsEmpleadosList;
