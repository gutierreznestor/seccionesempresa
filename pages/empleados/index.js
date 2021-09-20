import React, { useState } from 'react';

import { isAllowed } from '../../hocs/auth';

import Layout from '../../components/Layout';
import AppLink from '../../components/AppLink/AppLink.component';
import DataTable from '../../components/DataTable/DataTable.component';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.component';
import customServerSideHoc from '../../helpers/customServerSideProps';
import useEmpleados from '../../customHooks/useEmpleados';

const Empleados = ({ user, db }) => {
  const { data: { empleados, errorMessage }, handlers: { fetchEmpleados, deleteEmpleado } } = useEmpleados({ DB: db, user });

  const onDelete = (id) => {
    const ok = confirm('¿Quieres eliminar al empleado?');
    if (ok) {
      deleteEmpleado(id);
    }
  }

  React.useEffect(() => {
    fetchEmpleados();
  }, []);

  return (
    <Layout title='Empleados' user={user}>
      <AppLink
        enabled={!isAllowed(['auditor'], user?.Perfiles)}
        href='/empleados/new'
        title='Nuevo empleado' />
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {
        !errorMessage &&
        <>
          <DataTable
            data={empleados}
            user={user}
            notAllowed={['auditor']}
            path='empleados/edit'
            onDelete={onDelete}
            allowDelete
            showViewButton
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
