import React from 'react';
import Router from 'next/router'

import Form from '../../../components/Form/Form.component';
import Layout from '../../../components/Layout';
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

  const onSubmit = async (data) => {
    const { Nombre } = data;
    try {
      const res = await nuevaSeccionEmpresa({ Nombre })
      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      Router.push('/')
    } catch (e) {
      throw Error(e.message)
    }
  }

  return (
    <Layout title='Nueva sección'>
      <h1>Nueva sección</h1>
      <Form onFormSubmit={onSubmit} config={AgregarSeccionForm} />
    </Layout>
  )
}

export default NuevaSeccion;
