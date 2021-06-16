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
    try {
      const res = await nuevoPerfil({ Nombre })
      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      Router.push('/perfiles')
    } catch (e) {
      throw Error(e.message)
    }
  }

  return (
    <Layout title='Nuevo Perfil'>
      <h1>Nuevo Perfil</h1>
      <Form onFormSubmit={onSubmit} config={NuevoPerfilForm} />
    </Layout>
  )
}

export default NuevoPerfil;
