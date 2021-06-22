import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import { verify } from 'jsonwebtoken';

import Layout from '../../../components/Layout';
import LogsEmpleadosList from '../../../components/LogsEmpleadosList/LogsEmpleadosList.component';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';

const AuditoriaEmpleados = ({ data }) => {
  const [errorMessage, setErrorMessage] = useState('');
  return (
    <Layout title="Auditoría Empleados">
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {
        !errorMessage && <LogsEmpleadosList list={data} />
      }
    </Layout>
  )
}

AuditoriaEmpleados.getInitialProps = async (ctx) => {
  const cookie = ctx.req?.cookies.auth;
  const respSE = await fetch(`http://localhost:3000/api/logsEmpleados/get-logs-empleados`, {
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

export default AuditoriaEmpleados;
