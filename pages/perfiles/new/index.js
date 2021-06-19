import React from 'react';
import Router from 'next/router'

import Form from '../../../components/Form/Form.component';
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

  const onSubmit = async (data) => {
    const { Nombre } = data;
    const data = await nuevoPerfil({ Nombre })
    if (data.errorMessage) return setErrorMessage(data.errorMessage)
    Router.push('/perfiles')
  }

  return (
    <Layout title='Nuevo Perfil'>
      <h1>Nuevo Perfil</h1>
      <Form onFormSubmit={onSubmit} config={NuevoPerfilForm} />
    </Layout>
  )
}

export default NuevoPerfil;
