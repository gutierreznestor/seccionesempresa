import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import { verify } from 'jsonwebtoken';

import Layout from '../../../components/Layout';
import LogsSeccionesEmpresaList from '../../../components/LogsSeccionesEmpresaList/LogsSeccionesEmpresaList.component';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import parseCookies from '../../../helpers/parseCookies';
import { redirectToLogin } from '../../../helpers/redirectToLogin';

const AuditoriaSeccionesEmpresa = ({ data, user }) => {
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <Layout title="Auditoría Secciones empresa" user={user}>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {
        !errorMessage && <LogsSeccionesEmpresaList list={data} />
      }
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx.req);
  if (!cookie.auth) {
    redirectToLogin(ctx.res);
  }
  const respSE = await fetch(`http://localhost:3000/api/logsSeccionesEmpresa/get-logs-secciones-empresa`, {
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

export default AuditoriaSeccionesEmpresa;
