import React from 'react';

import ButtonTable from '../ButtonTable/ButtonTable.component';

const PerfilesUsuarioList = ({ list = [], onDelete, onEdit, readonly }) => {

  return (
    <>
      <h2>Perfiles</h2>
      <table>
        <tbody>
          <tr>
            <th>id</th>
            <th>Perfil</th>
            <th>Tiene perfil</th>
          </tr>
          {list.map(({ idPerfil, Perfil, idUsuario, TienePerfil }) => (
            <tr key={idPerfil}>
              <td>{idPerfil}</td>
              <td>{Perfil}</td>
              <td>{TienePerfil === 'No' ? TienePerfil : <strong>{TienePerfil}</strong>}</td>
              {!readonly && (
                <td>
                  <ButtonTable type='Editar' onClick={() => onEdit({ idPerfil })} />
                  <ButtonTable type='Eliminar' onClick={() => onDelete(idPerfil)} />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default PerfilesUsuarioList;
