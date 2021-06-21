import React from 'react';

import { StyledTable } from './LogsPerfilesList.styled';

const LogsPerfilesList = ({ list = [] }) => {
  return (
    <>
      <h1>
        Logs perfiles
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
            idLogPerfil,
            Creado,
            idUsuario,
            Usuario,
            Operacion,
            Descripcion
          }) => (
            <tr key={idLogPerfil}>
              <td>{idLogPerfil}</td>
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

export default LogsPerfilesList;
