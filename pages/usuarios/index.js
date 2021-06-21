import React, { useState } from 'react';
import Router from 'next/router';
import { verify } from 'jsonwebtoken';

import Layout from '../../components/Layout';
import AppLink from '../../components/AppLink/AppLink.component';
import UsuariosList from '../../components/UsuariosList/UsuariosList.component';
import { deleteUsuario, getUsuarios } from '../../services/usuarios.service';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.component';

const Usuarios = ({ listUsuarios }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const onDelete = async (id) => {
    const ok = confirm('¿Quieres eliminar al usuario?');
    if (ok) {
      setLoading(true);
      const data = await deleteUsuario({ idUsuario: 1, id });
      if (data.errorMessage) return setErrorMessage(data.errorMessage);
      Router.push('usuarios');
    }
  }

  return (
    <Layout title='Usuarios'>
      <h1>Usuarios</h1>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <AppLink href='/usuarios/new' title='Nuevo usuario' />
      <UsuariosList
        list={listUsuarios}
        onDelete={onDelete}
      />
    </Layout>
  )
}
Usuarios.getInitialProps = async (ctx) => {
  const cookie = ctx.req?.headers.cookie;
  const resp = await fetch('http://localhost:3000/api/usuarios/get-usuarios', {
    headers: {
      cookie,
    }
  })
  const listUsuarios = await resp.json();
  let user = null;
  verify(cookie, 'secret', async (err, decoded) => {
    if (!err && decoded) {
      user = decoded.user;
    }
  });
  return { listUsuarios, user };
}

export default Usuarios;
