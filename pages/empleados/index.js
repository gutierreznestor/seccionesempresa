import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import { verify } from 'jsonwebtoken';

import Layout from '../../components/Layout';
import AppLink from '../../components/AppLink/AppLink.component';
import EmpleadosList from '../../components/EmpleadosList/EmpleadosList.component';
import { deleteEmpleado } from '../../services/empleados.service';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.component';
import parseCookies from '../../helpers/parseCookies';
import { redirectToLogin } from '../../helpers/redirectToLogin';

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
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <AppLink href='/empleados/new' title='Nuevo empleado' />
      <EmpleadosList
        list={data}
        onDelete={onDelete}
      />
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx.req);
  if (!cookie.auth) {
    redirectToLogin(ctx.res);
  }
  const respSE = await fetch('http://localhost:3000/api/empleados/get-empleados', {
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
  let data = await respSE.json();
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
