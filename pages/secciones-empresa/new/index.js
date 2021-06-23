import React, { useState } from 'react';
import Router from 'next/router';
import { verify } from 'jsonwebtoken';

import Form from '../../../components/Form/Form.component';
import Layout from '../../../components/Layout';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component'
import { nuevaSeccionEmpresa } from '../../../services/seccionesEmpresa.service';
import parseCookies from '../../../helpers/parseCookies';
import { redirectToLogin } from '../../../helpers/redirectToLogin';

const AgregarSeccionForm = [
  {
    label: 'Nombre',
    type: 'text',
    name: 'Nombre',
    placeholder: 'Producción',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
];

const NuevaSeccion = ({ user, error }) => {
  const [errorMessage, setErrorMessage] = useState(error);

  const onSubmit = async (data) => {
    const { Nombre } = data;
    const res = await nuevaSeccionEmpresa({ user: user?.idUsuario, Nombre })
    if (res.errorMessage) {
      return setErrorMessage(res.errorMessage);
    }
    Router.push('/secciones-empresa')
  }

  return (
    <Layout title='Nueva sección' user={user}>
      <h1>Nueva sección</h1>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Form onFormSubmit={onSubmit} config={AgregarSeccionForm} />
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx.req);
  if (!cookie.auth) {
    redirectToLogin(ctx.res);
  }
  const respSE = await fetch('http://localhost:3000/api/secciones-empresa/get-secciones-empresa', {
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

export default NuevaSeccion;
