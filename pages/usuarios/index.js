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

const Usuarios = ({ data, user }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const onDelete = async (id) => {
    const ok = confirm('¿Quieres eliminar al usuario?');
    if (ok) {
      const data = await deleteUsuario({ idUsuario: user.idUsuario, id });
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
        list={data}
        onDelete={onDelete}
      />
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx.req);
  const respSE = await fetch('http://localhost:3000/api/usuarios/get-usuarios', {
    headers: {
      cookie,
    }
  })
  const data = await respSE.json();
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

export default Usuarios;
