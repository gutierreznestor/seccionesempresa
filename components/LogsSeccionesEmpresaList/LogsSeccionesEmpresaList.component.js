import React from 'react';

import { StyledTable } from './LogsSeccionesEmpresaList.styled';

const LogsSeccionesEmpresaList = ({ list = [] }) => {
  return (
    <>
      <h1>
        Logs secciones empresa
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
            idLogSeccionEmpresa,
            Creado,
            idUsuario,
            Usuario,
            Operacion,
            Descripcion
          }) => (
            <tr key={idLogSeccionEmpresa}>
              <td>{idLogSeccionEmpresa}</td>
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

export default LogsSeccionesEmpresaList;
