import React, { useRef } from 'react';
import Link from 'next/link';


import { isAllowed } from '../../hocs/auth';
import Button from '../Button/Button.component';
import ButtonTable from '../ButtonTable/ButtonTable.component';
import { TableContainer } from './DataTable.styled';
import usePrinter from '../../customHooks/usePrinter';

const pathId = ({ path, row, columns }) => {
  return `${path}/${row[columns[0]]}`;
}

const pathAsiento = ({ path, row, columns }) => {
  return `${path}/edit?Numero=${row[columns[0]]}&Renglon=${row[columns[1]]}`;
}

/**
 * Render a list of data
 * @param {boolean} allowPrint
 * @param {boolean} allowDelete
 * @param {object} columnStyles
 * @param {array} data
 * @param {array} notAllowed
 * @param {function} onDelete
 * @param {string} path
 * @param {boolean} readonly
 * @param {boolean} showViewButton
 * @param {object} tableStyle
 * @param {object} user
 */
const DataTable = ({
  allowPrint,
  allowDelete,
  columnStyles = {},
  data,
  notAllowed = [],
  onDelete,
  path = 'usuarios',
  readonly,
  showViewButton,
  user,
  tableStyle = {},
  title,
}) => {
  const columns = data[0] && Object.keys(data[0]);
  const { ref, PrintButton } = usePrinter();

  return (
    <>
      {data && data.length === 0 ?
        <h3>Todavía no hay datos para mostrar.</h3> :
        <>
          {allowPrint && PrintButton}
          <div ref={ref}>
            {title && <h3>{title}</h3>}
            <TableContainer tableStyle={tableStyle}>
              <thead>
                <tr>{data[0] && columns.map((heading, idx) => <th key={heading} style={columnStyles[idx]}>{heading}</th>)}</tr>
              </thead>
              <tbody>
                {
                  data?.map((row, idx) => <tr key={row.id ? row.id : idx}>
                    {
                      columns.map((column, idx) => <td key={column} style={columnStyles[idx]}>{row[column]}</td>)
                    }
                    {!readonly && (
                      <>
                        {
                          showViewButton &&
                          <td>
                            <Link href={path === 'asientos' ? pathAsiento({ path, row, columns }) : pathId({ path, row, columns })} passHref>
                              <ButtonTable
                                type='Ver' />
                            </Link>
                          </td>
                        }
                        {allowDelete &&
                          <td>
                            <ButtonTable
                              enabled={!isAllowed(notAllowed, user?.Perfiles)}
                              type='Eliminar'
                              onClick={() => {
                                if (path === 'asientos') {
                                  onDelete({ Numero: row[columns[0]], Renglon: row[columns[1]] });
                                } else {
                                  onDelete(row[columns[0]]);
                                }
                              }} />
                          </td>
                        }
                      </>
                    )}
                  </tr>)
                }
              </tbody>
            </TableContainer>
          </div>
        </>
      }
    </>
  )
}

export default DataTable;
