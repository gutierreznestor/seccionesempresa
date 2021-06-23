import React from 'react';
import fetch from 'isomorphic-unfetch';
import { verify } from 'jsonwebtoken';

import Layout from '../../../components/Layout';
import LogsUsuariosList from '../../../components/LogsUsuariosList/LogsUsuariosList.component';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import parseCookies from '../../../helpers/parseCookies';
import { redirectToLogin } from '../../../helpers/redirectToLogin';

const AuditoriaUsuarios = ({ data, user, error }) => {
  return (
    <Layout title="Auditoría Usuarios" user={user}>
      {error && <ErrorMessage message={error} />}
      {
        !error && <LogsUsuariosList list={data} />
      }
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx.req);
  if (!cookie.auth) {
    redirectToLogin(ctx.res);
  }
  const res = await fetch(`http://localhost:3000/api/logsUsuarios/get-logs-usuarios`, {
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

export default AuditoriaUsuarios;
