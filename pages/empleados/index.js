import React, { useState } from 'react';
import { verify } from 'jsonwebtoken';

import Layout from '../../components/Layout';
import AppLink from '../../components/AppLink/AppLink.component';
import EmpleadosList from '../../components/EmpleadosList/EmpleadosList.component';
import { deleteEmpleado } from '../../services/empleados.service';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.component';

const Empleados = ({ listEmpleados }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onDelete = async (id) => {
    const ok = confirm('¿Quieres eliminar al empleado?');
    if (ok) {
      setLoading(true);
      const data = await deleteEmpleado({ idUsuario: 1, idEmpleado: id });
      if (data.errorMessage) return setErrorMessage(data.errorMessage);
      // fetchEmpleados();
      // Router.push('empleados');
    }
  }

  return (
    <Layout title='Empleados'>
      <h1>Empleados</h1>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <AppLink href='/empleados/new' title='Nuevo empleado' />
      {loading ?
        <span>Cargando...</span> :
        <EmpleadosList
          list={listEmpleados}
          onDelete={onDelete}
        />}
    </Layout>
  )
}

Empleados.getInitialProps = async (ctx) => {
  const cookie = ctx.req?.headers.cookie;
  const resp = await fetch('http://localhost:3000/api/empleados/get-empleados', {
    headers: {
      cookie,
    }
  })
  const listEmpleados = await resp.json();
  let user = null;
  verify(ctx.req?.cookies.auth, 'secret', async (err, decoded) => {
    if (!err && decoded) {
      user = decoded.user;
    }
  });
  return { listEmpleados, user };
}

export default Empleados;
