import React, { useState } from 'react';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import { verify } from 'jsonwebtoken';

import { redirectToLogin } from '../../helpers/redirectToLogin';
import { deletePerfiles } from '../../services/perfiles.service';
import { isAllowed } from '../../hocs/auth';
import Layout from '../../components/Layout'
import AppLink from '../../components/AppLink/AppLink.component';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.component';
import parseCookies from '../../helpers/parseCookies';
import DataTable from '../../components/DataTable/DataTable.component';

const Perfiles = ({ data, user, error }) => {
  const [errorMessage, setErrorMessage] = useState(error);

  const onDelete = async (id) => {
    setErrorMessage('');
    const ok = confirm('¿Quieres eliminar el perfil?');
    if (ok) {
      const data = await deletePerfiles({ user: user?.idUsuario, id });
      if (data.errorMessage) return setErrorMessage(data.errorMessage);
      Router.push('perfiles');
    }
  }

  return (
    <Layout title='Perfiles' user={user}>
      <h1>Perfiles</h1>
      <AppLink
        enabled={!isAllowed(['auditor'], user.Perfiles)}
        href='/perfiles/new'
        title='Nuevo Perfil' />
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {
        !error &&
        <>
          <DataTable
            data={data}
            user={user}
            notAllowed={['auditor']}
            path='perfiles'
            onDelete={onDelete}
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
  const res = await fetch('http://localhost:3000/api/perfiles/get-perfiles', {
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

export default Perfiles;
