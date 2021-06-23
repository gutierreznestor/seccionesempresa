import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import { verify } from 'jsonwebtoken';

import Layout from '../../../components/Layout';
import LogsPerfilesList from '../../../components/LogsPerfilesList/LogsPerfilesList.component';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import parseCookies from '../../../helpers/parseCookies';
import { redirectToLogin } from '../../../helpers/redirectToLogin';

const AuditoriaPerfiles = ({ data, user }) => {
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <Layout title="Auditoría Perfiles" user={user}>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {
        !errorMessage && <LogsPerfilesList list={data} />
      }
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx.req);
  if (!cookie.auth) {
    redirectToLogin(ctx.res);
  }
  const respSE = await fetch(`http://localhost:3000/api/logsPerfiles/get-logs-perfiles`, {
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

export default AuditoriaPerfiles;
