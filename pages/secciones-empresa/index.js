import React from 'react';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import { verify } from 'jsonwebtoken';
import parseCookies from '../../helpers/parseCookies';

import { deleteSeccionesEmpresa } from '../../services/seccionesEmpresa.service';
import { redirectToLogin } from '../../helpers/redirectToLogin';
import Layout from '../../components/Layout'
import AppLink from '../../components/AppLink/AppLink.component';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.component';
import DataTable from '../../components/DataTable/DataTable.component';

const SeccionesEmpresa = ({ data, user, error }) => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(error);

  const onDelete = async (id) => {
    setErrorMessage('');
    const ok = confirm('¿Quieres eliminar la sección?');
    if (ok) {
      setLoading(true);
      const data = await deleteSeccionesEmpresa(id);
      setLoading(false);
      if (data.errorMessage) return setErrorMessage(data.errorMessage);
      Router.push('secciones-empresa');
    }
  }
  return (
    <Layout title='Secciones empresa' user={user}>
      <h1>Secciones empresa</h1>
      <AppLink href='/secciones-empresa/new' title='Nueva sección' />
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {
        !error &&
        <>
          <DataTable
            data={data}
            user={user}
            notAllowed={['auditor']}
            path='secciones-empresa'
          />
        </>
      }
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx.req);
  if (!cookie.auth) {
    redirectToLogin(ctx.res);
  }
  const res = await fetch('http://localhost:3000/api/secciones-empresa/get-secciones-empresa', {
    headers: {
      cookie,
    }
  })
  let user = null;
  verify(cookie.auth, 'secret', async (err, decoded) => {
    if (!err && decoded) {
      user = decoded.user;
    }
  });
  let data = await res.json();
  let error = null;
  if (data.errorMessage) {
    error = data.errorMessage;
    data = [];
  }
  return {
    props: { data, user, error },
  }
}

export default SeccionesEmpresa;
