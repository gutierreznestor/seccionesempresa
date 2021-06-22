import React, { useState } from 'react';
import Router from 'next/router';
import { verify } from 'jsonwebtoken';

import Form from '../../../components/Form/Form.component';
import Layout from '../../../components/Layout';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component'
import { nuevaSeccionEmpresa } from '../../../services/seccionesEmpresa.service';

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

const NuevaSeccion = ({ user }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    const { Nombre } = data;
    const res = await nuevaSeccionEmpresa({ user: user?.idUsuario, Nombre })
    if (res.errorMessage) {
      return setErrorMessage(res.errorMessage);
    }
  }

  return (
    <Layout title='Nueva sección'>
      <h1>Nueva sección</h1>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Form onFormSubmit={onSubmit} config={AgregarSeccionForm} />
    </Layout>
  )
}

NuevaSeccion.getInitialProps = async (ctx) => {
  let user = null;
  verify(ctx.req?.cookies.auth, 'secret', async (err, decoded) => {
    if (!err && decoded) {
      user = decoded.user;
    }
  });
  return { user };
}

export default NuevaSeccion;
