import React from 'react';

import ButtonTable from '../ButtonTable/ButtonTable.component';
import { BackupListContainer } from './BackupList.styled';

const BackupList = ({ list = [], user, onDelete, readonly }) => {

  const [sanitized, setSanitized] = React.useState([]);

  React.useEffect(() => {
    const sanitizeList = () => {
      const newList = list.map(item => ({ Backups: item }));
      setSanitized(newList);
    };
    sanitizeList();
  }, [list]);

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
                <ButtonTable type='Restablecer' onClick={() => onDelete(backup)} />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </BackupListContainer>
  )
}

export default BackupList;
