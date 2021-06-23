import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import { verify } from 'jsonwebtoken';

import Layout from '../../../components/Layout';
import LogsEmpleadosList from '../../../components/LogsEmpleadosList/LogsEmpleadosList.component';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import parseCookies from '../../../helpers/parseCookies';

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

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx.req);
  const respSE = await fetch(`http://localhost:3000/api/logsEmpleados/get-logs-empleados`, {
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

export default AuditoriaEmpleados;
