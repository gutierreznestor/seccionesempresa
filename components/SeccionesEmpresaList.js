import React from 'react';
import ButtonTable from './ButtonTable/ButtonTable.component';

const SeccionesEmpresaList = ({ list = [] }) => {
  const onEdit = (id) => {

  }
  const onDelete = (id) => {

  }
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
            <ButtonTable type='Editar' onClick={() => onEdit(idSeccionEmpresa)} />
            <ButtonTable type='Eliminar' onClick={() => onDelete(idSeccionEmpresa)} />
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SeccionesEmpresaList;
