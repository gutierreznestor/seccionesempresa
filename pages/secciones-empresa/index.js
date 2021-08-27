import React from 'react';
import Router from 'next/router';

import { deleteSeccionesEmpresa } from '../../services/seccionesEmpresa.service';
import Layout from '../../components/Layout'
import AppLink from '../../components/AppLink/AppLink.component';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.component';
import DataTable from '../../components/DataTable/DataTable.component';
import { isAllowed } from '../../hocs/auth';
import useGetSeccionesEmpresa from '../../customHooks/useGetSeccionesEmpresa';
import customServerSideHoc from '../../helpers/customServerSideProps';

const SeccionesEmpresa = ({ user, error, db }) => {
  const [err, setErrorMessage] = React.useState(error);

  const {
    data: {
      errorMessage,
      seccionesEmpresa,
    },
    handlers: { fetchSeccionesEmpresa },
  } = useGetSeccionesEmpresa();

  React.useEffect(() => {
    fetchSeccionesEmpresa(db);
  }, []);

  const onDelete = async (id) => {
    setErrorMessage('');
    const ok = confirm('¿Quieres eliminar la sección?');
    if (ok) {
      const data = await deleteSeccionesEmpresa(id);
      if (data.errorMessage) return setErrorMessage(data.errorMessage);
      Router.push('secciones-empresa');
    }
  }
  return (
    <Layout title='Secciones empresa' user={user}>
      <h1>Secciones empresa</h1>
      <AppLink
        enabled={!isAllowed(['auditor'], user?.Perfiles)}
        href='/secciones-empresa/new'
        title='Nueva sección' />
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {
        !errorMessage &&
        <>
          <DataTable
            data={seccionesEmpresa}
            user={user}
            notAllowed={['auditor']}
            path='secciones-empresa'
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

export default SeccionesEmpresa;
