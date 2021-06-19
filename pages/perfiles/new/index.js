import React, { useState } from 'react';
import Router from 'next/router'

import Form from '../../../components/Form/Form.component';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import Layout from '../../../components/Layout';
import { nuevoPerfil } from '../../../services/perfiles.service';

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

const NuevoPerfil = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    setErrorMessage('');
    const { Nombre } = data;
    const res = await nuevoPerfil({ Nombre })
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

export default NuevoPerfil;
