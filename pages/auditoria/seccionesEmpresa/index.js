import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import { verify } from 'jsonwebtoken';

import Layout from '../../../components/Layout';
import LogsSeccionesEmpresaList from '../../../components/LogsSeccionesEmpresaList/LogsSeccionesEmpresaList.component';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';

const AuditoriaSeccionesEmpresa = ({ data }) => {
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <Layout title="Auditoría Secciones empresa">
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {
        !errorMessage && <LogsSeccionesEmpresaList list={data} />
      }
    </Layout>
  )
}

AuditoriaSeccionesEmpresa.getInitialProps = async (ctx) => {
  const cookie = ctx.req?.cookies.auth;
  const respSE = await fetch(`http://localhost:3000/api/logsSeccionesEmpresa/get-logs-secciones-empresa`, {
    headers: {
      cookie,
    }
  })
  let res = await respSE.json();
  let data = (res && res.length) ? res : [];
  let user = null;
  verify(ctx.req?.cookies.auth, 'secret', async (err, decoded) => {
    if (!err && decoded) {
      user = decoded.user;
    }
  });
  return { data, user };
}

export default AuditoriaSeccionesEmpresa;
