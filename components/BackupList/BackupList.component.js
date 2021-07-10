import React from 'react';

import ButtonTable from '../ButtonTable/ButtonTable.component';
import { BackupListContainer } from './BackupList.styled';

const BackupList = ({ list = [], onRestoreBackup, readonly }) => {

  return (
    <BackupListContainer>
      <tbody>
        <tr>
          <th>Copias de seguridad</th>
        </tr>
        {list.map((backup) => (
          <tr key={backup}>
            <td>{backup}</td>
            {!readonly && (
              <td>
                <ButtonTable type='Restablecer' onClick={() => onRestoreBackup(backup)} />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </BackupListContainer>
  )
}

export default BackupList;
