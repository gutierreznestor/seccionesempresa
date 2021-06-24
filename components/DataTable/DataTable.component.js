import React from 'react';
import Link from 'next/link';

import ButtonTable from '../ButtonTable/ButtonTable.component';
import { isAllowed } from '../../hocs/auth';

const DataTable = ({
  data,
  user,
  onDelete,
  readonly,
  notAllowed = [],
}) => {
  const columns = data[0] && Object.keys(data[0]);
  return (
    <table>
      <thead>
        <tr>{data[0] && columns.map((heading) => <th key={heading}>{heading}</th>)}</tr>
      </thead>
      <tbody>
        {
          data.map((row) => <tr>
            {
              columns.map((column) => <td key={column}>{row[column]}</td>)
            }
            {!readonly && (
              <td>
                <Link href={`usuarios/${row[columns[0]]}`} passHref>
                  <ButtonTable
                    type='Ver' />
                </Link>
                <ButtonTable
                  enabled={!isAllowed(notAllowed, user.Perfiles)}
                  type='Eliminar'
                  onClick={() => onDelete(row[columns[0]])} />
              </td>
            )}
          </tr>)
        }
      </tbody>
    </table>
  )
}

export default DataTable;
