import React from 'react';
import Router from 'next/router';

import ButtonTable from './ButtonTable/ButtonTable.component';

const SeccionesEmpresaList = ({ list = [] }) => {
  const onEdit = (id) => {

  }
  const onDelete = async (idSeccionEmpresa) => {
    const ok = confirm('¿Quieres eliminar la sección?');
    if (ok) {
      try {
        const res = await fetch('/api/seccionesEmpresa/delete-secciones-empresa', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idSeccionEmpresa,
          }),
        })
        const json = await res.json()
        if (!res.ok) throw Error(json.message)
        Router.push('/secciones-empresa')
      } catch (e) {
        throw Error(e.message)
      }
    }
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
