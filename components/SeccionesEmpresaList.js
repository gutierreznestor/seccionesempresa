import React from 'react';

const SeccionesEmpresaList = ({ list = [] }) => {
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
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SeccionesEmpresaList;
