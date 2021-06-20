import React, { useState } from 'react';
import Router from 'next/router'

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

const NuevaSeccion = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    const { Nombre } = data;
    const res = await nuevaSeccionEmpresa({ user: 4, Nombre })
    if (res.errorMessage) {
      return setErrorMessage(res.errorMessage);
    }
    Router.push('/')
  }

  return (
    <Layout title='Nueva sección'>
      <h1>Nueva sección</h1>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Form onFormSubmit={onSubmit} config={AgregarSeccionForm} />
    </Layout>
  )
}

export default NuevaSeccion;
