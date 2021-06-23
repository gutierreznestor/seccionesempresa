import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import { verify } from 'jsonwebtoken';

import Layout from '../../../components/Layout';
import LogsUsuariosList from '../../../components/LogsUsuariosList/LogsUsuariosList.component';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import parseCookies from '../../../helpers/parseCookies';
import { redirectToLogin } from '../../../helpers/redirectToLogin';

const AuditoriaUsuarios = ({ data, user }) => {
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <Layout title="Auditoría Usuarios" user={user}>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {
        !errorMessage && <LogsUsuariosList list={data} />
      }
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx.req);
  if (!cookie.auth) {
    redirectToLogin(ctx.res);
  }
  const respSE = await fetch(`http://localhost:3000/api/logsUsuarios/get-logs-usuarios`, {
    headers: {
      cookie,
    }
  })
  let res = await respSE.json();
  let data = (res && res.length) ? res : [];
  let user = null;
  verify(cookie.auth, 'secret', async (err, decoded) => {
    if (!err && decoded) {
      user = decoded.user;
    }
  });
  return {
    props: { data, user },
  }
}

export default AuditoriaUsuarios;
