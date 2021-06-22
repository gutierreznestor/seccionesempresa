import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import { verify } from 'jsonwebtoken';

import Layout from '../../components/Layout';
import AppLink from '../../components/AppLink/AppLink.component';
import EmpleadosList from '../../components/EmpleadosList/EmpleadosList.component';
import { deleteEmpleado } from '../../services/empleados.service';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.component';
import parseCookies from '../../helpers/parseCookies';

const Empleados = ({ data, user }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const onDelete = async (id) => {
    const ok = confirm('¿Quieres eliminar al empleado?');
    if (ok) {
      const data = await deleteEmpleado({ idUsuario: user.idUsuario, idEmpleado: id });
      if (data.errorMessage) return setErrorMessage(data.errorMessage);
    }
  }

  return (
    <Layout title='Empleados'>
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
  const respSE = await fetch('http://localhost:3000/api/empleados/get-empleados', {
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

export default Empleados;
