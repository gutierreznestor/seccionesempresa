import React, { useState } from 'react';
import Router from 'next/router'
import { verify } from 'jsonwebtoken';

import Form from '../../../components/Form/Form.component';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import Layout from '../../../components/Layout';
import { nuevoPerfil } from '../../../services/perfiles.service';
import parseCookies from '../../../helpers/parseCookies';
import { redirectToLogin } from '../../../helpers/redirectToLogin';

const NuevoPerfilForm = [
  {
    label: 'Nombre',
    type: 'text',
    name: 'Nombre',
    placeholder: 'Administrador',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
];

const NuevoPerfil = ({ user }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    setErrorMessage('');
    const { Nombre } = data;
    const res = await nuevoPerfil({ user: user?.idUsuario, Nombre })
    if (res.errorMessage) return setErrorMessage(res.errorMessage)
    Router.push('/perfiles')
  }

  return (
    <Layout title='Nuevo Perfil'>
      <h1>Nuevo Perfil</h1>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Form onFormSubmit={onSubmit} config={NuevoPerfilForm} />
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx.req);
  if (!cookie.auth) {
    redirectToLogin(ctx.res);
  }
  let user = null;
  verify(cookie.auth, 'secret', async (err, decoded) => {
    if (!err && decoded) {
      user = decoded.user;
    }
  });
  return {
    props: { user },
  }
}

export default NuevoPerfil;
