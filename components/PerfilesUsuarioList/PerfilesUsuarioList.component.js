import React, { useState, useEffect } from 'react';

import ButtonTable from '../ButtonTable/ButtonTable.component';

const PerfilesUsuarioList = ({ list = [], onDelete, onEdit, readonly }) => {

  const [activeProfiles, setActiveProfiles] = useState(list);

  useEffect(() => {
    if (readonly) {
      setActiveProfiles(list?.filter(perfil => perfil.TienePerfil !== 'No'));
    } else {
      setActiveProfiles(list);
    }
  }, [list, readonly]);

  return (
    <>
      <h2>Perfiles</h2>
      <table>
        <tbody>
          <tr>
            <th>id</th>
            <th>Perfil</th>
          </tr>
          {activeProfiles.map(({ idPerfil, Perfil, idUsuario, TienePerfil }) => (
            <tr key={idPerfil}>
              <td>{idPerfil}</td>
              <td>{Perfil}</td>
              {!readonly ?
                TienePerfil === 'No' ?
                  <>
                    <td>
                      <ButtonTable type='Agregar' ti onClick={() => onEdit({ idPerfil, idUsuario })} />
                    </td>
                  </> :
                  <>
                    <td>
                      <ButtonTable type='Quitar' ti onClick={() => onDelete({ idPerfil, idUsuario })} />
                    </td>
                  </>
                : null
              }
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default PerfilesUsuarioList;
