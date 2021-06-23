import React, { useState } from 'react';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import { verify } from 'jsonwebtoken';

import Layout from '../../components/Layout';
import AppLink from '../../components/AppLink/AppLink.component';
import UsuariosList from '../../components/UsuariosList/UsuariosList.component';
import { deleteUsuario } from '../../services/usuarios.service';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.component';
import parseCookies from '../../helpers/parseCookies';
import { redirectToLogin } from '../../helpers/redirectToLogin';
import { isAllowed } from '../../hocs/auth';

const Usuarios = ({ data, user, error }) => {
  const [errorMessage, setErrorMessage] = useState(error);

  const onDelete = async (id) => {
    const ok = confirm('¿Quieres eliminar al usuario?');
    if (ok) {
      const data = await deleteUsuario({ idUsuario: user.idUsuario, id });
      if (data.errorMessage) return setErrorMessage(data.errorMessage);
      Router.push('usuarios');
    }
  }
  return (
    <Layout title='Usuarios' user={user}>
      <h1>Usuarios</h1>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <AppLink href='/usuarios/new' title='Nuevo usuario' enabled={!isAllowed(['auditor'], user.Perfiles)} />
      <UsuariosList
        list={data}
        onDelete={onDelete}
        user={user}
      />
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx.req);
  if (!cookie.auth) {
    redirectToLogin(ctx.res);
  }
  const res = await fetch('http://localhost:3000/api/usuarios/get-usuarios', {
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

export default Usuarios;
