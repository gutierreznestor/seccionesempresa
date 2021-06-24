import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import { verify } from 'jsonwebtoken';

import { isAllowed } from '../../hocs/auth';
import parseCookies from '../../helpers/parseCookies';
import { redirectToLogin } from '../../helpers/redirectToLogin';

import Layout from '../../components/Layout';
import AppLink from '../../components/AppLink/AppLink.component';
import DataTable from '../../components/DataTable/DataTable.component';
import { deleteEmpleado } from '../../services/empleados.service';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.component';

const Empleados = ({ data, user, error }) => {
  const [errorMessage, setErrorMessage] = useState(error);

  const onDelete = async (id) => {
    const ok = confirm('¿Quieres eliminar al empleado?');
    if (ok) {
      const data = await deleteEmpleado({ idUsuario: user.idUsuario, idEmpleado: id });
      if (data.errorMessage) return setErrorMessage(data.errorMessage);
    }
  }

  return (
    <Layout title='Empleados' user={user}>
      <h1>Empleados</h1>
      <AppLink
        enabled={!isAllowed(['auditor'], user.Perfiles)}
        href='/empleados/new'
        title='Nuevo empleado' />
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {
        !error &&
        <>
          <DataTable
            data={data}
            user={user}
            notAllowed={['auditor']}
            path='empleados'
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
  const res = await fetch('http://localhost:3000/api/empleados/get-empleados', {
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

export default Empleados;
