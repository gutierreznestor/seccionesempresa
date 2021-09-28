import React, { useRef } from 'react';
import Link from 'next/link';
import { useReactToPrint } from 'react-to-print';


import { isAllowed } from '../../hocs/auth';
import Button from '../Button/Button.component';
import ButtonTable from '../ButtonTable/ButtonTable.component';
import { TableContainer } from './DataTable.styled';

const pathId = ({ path, row, columns }) => {
  return `${path}/${row[columns[0]]}`;
}

const pathAsiento = ({ path, row, columns }) => {
  return `${path}/edit?Numero=${row[columns[0]]}&Renglon=${row[columns[1]]}`;
}

const DataTable = ({
  allowPrint,
  allowDelete,
  data,
  notAllowed = [],
  onDelete,
  path = 'usuarios',
  readonly,
  showViewButton,
  user,
}) => {
  const columns = data[0] && Object.keys(data[0]);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      {data && data.length === 0 ?
        <h3>Todavía no hay datos para mostrar.</h3> :
        <>
          {allowPrint && <Button label="Imprimir" onClick={handlePrint} />}
          <TableContainer ref={componentRef}>
            <thead>
              <tr>{data[0] && columns.map((heading) => <th key={heading}>{heading}</th>)}</tr>
            </thead>
            <tbody>
              {
                data?.map((row) => <tr key={row?.id}>
                  {
                    columns.map((column) => <td key={column}>{row[column]}</td>)
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
        </>
      }
    </>
  )
}

export default DataTable;
