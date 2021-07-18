import React, { useRef } from 'react';
import Link from 'next/link';
import { useReactToPrint } from 'react-to-print';


import { isAllowed } from '../../hocs/auth';
import Button from '../Button/Button.component';
import ButtonTable from '../ButtonTable/ButtonTable.component';
import { TableContainer } from './DataTable.styled';

const DataTable = ({
  data,
  user,
  onDelete,
  readonly,
  notAllowed = [],
  path = 'usuarios',
}) => {
  const columns = data[0] && Object.keys(data[0]);
  const showViewButton =
    path?.includes('usuarios');
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      {data && data.length === 0 ?
        <h3>No hay datos para mostrar.</h3> :
        <>
          <Button label="Imprimir" onClick={handlePrint} />
          <TableContainer ref={componentRef}>
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
                      {
                        showViewButton &&
                        <Link href={`${path}/${row[columns[0]]}`} passHref>
                          <ButtonTable
                            type='Ver' />
                        </Link>
                      }

                      <ButtonTable
                        enabled={!isAllowed(notAllowed, user.Perfiles)}
                        type='Eliminar'
                        onClick={() => onDelete(row[columns[0]])} />
                    </td>
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
