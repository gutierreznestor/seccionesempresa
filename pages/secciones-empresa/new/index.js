import React from 'react';
import { useForm } from 'react-hook-form';
import Form from '../../../components/Form/Form.component';
import Input from '../../../components/Input/input.component';

import Layout from '../../../components/Layout';

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

  const onSubmit = data => {
    console.log({ page: data })
  };
  return (
    <Layout title='Nueva sección'>
      <h1>Nueva sección</h1>
      <Form onFormSubmit={onSubmit} config={AgregarSeccionForm} />
    </Layout>
  )
}

export default NuevaSeccion;
