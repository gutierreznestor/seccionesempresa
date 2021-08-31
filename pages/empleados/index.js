import React, { useState } from 'react';

import { isAllowed } from '../../hocs/auth';

import Layout from '../../components/Layout';
import AppLink from '../../components/AppLink/AppLink.component';
import DataTable from '../../components/DataTable/DataTable.component';
import { deleteEmpleado } from '../../services/empleados.service';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.component';
import customServerSideHoc from '../../helpers/customServerSideProps';
import useGetEmpleados from '../../customHooks/useGetEmpleados';

const Empleados = ({ user, error, db }) => {
  const [errorMessage, setErrorMessage] = useState(error);
  const { data: { empleados }, handlers: { fetchEmpleados } } = useGetEmpleados();

  const onDelete = async (id) => {
    setErrorMessage('');
    const ok = confirm('¿Quieres eliminar al empleado?');
    if (ok) {
      const data = await deleteEmpleado({ idUsuario: user.idUsuario, idEmpleado: id });
      if (data.errorMessage) return setErrorMessage(data.errorMessage);

    }
  }

  React.useEffect(() => {
    fetchEmpleados(db);
  }, []);

  return (
    <Layout title='Empleados' user={user}>
      <h1>Empleados</h1>
      <AppLink
        enabled={!isAllowed(['auditor'], user?.Perfiles)}
        href='/empleados/new'
        title='Nuevo empleado' />
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {
        !error &&
        <>
          <DataTable
            data={empleados}
            user={user}
            notAllowed={['auditor']}
            path='empleados'
            onDelete={onDelete}
          />
        </>
      }
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  return await customServerSideHoc(ctx);
}

export default Empleados;
