import React from 'react';

import Form from '../../../components/Form/Form.component';
import Layout from '../../../components/Layout';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component'
import useSeccionesEmpresa from '../../../customHooks/useSeccionesEmpresa';
import customServerSideHoc from '../../../helpers/customServerSideProps';

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

const NuevaSeccion = ({ user, db }) => {
  const { data: { errorMessage }, handlers: { createSeccionEmpresa } } = useSeccionesEmpresa({ DB: db, user });

  const onSubmit = async (data) => {
    const { Nombre } = data;
    createSeccionEmpresa({ Nombre })
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
  return await customServerSideHoc(ctx);
}

export default NuevaSeccion;
