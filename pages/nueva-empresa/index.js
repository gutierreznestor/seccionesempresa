import React from 'react';

import Layout from '../../components/Layout';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.component';
import Form from '../../components/Form/Form.component';
import useCreateEmpresa from '../../customHooks/useCreateEmpresa';

const NuevaEmpresaForm = [
  {
    label: 'Nombre empresa',
    type: 'text',
    name: 'empresa',
    placeholder: 'Empresa X',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
  {
    label: 'Nombre base de dato',
    type: 'text',
    name: 'DB',
    placeholder: 'empresax',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
];

const NuevaEmpresa = ({ user }) => {
  const { data: { errorMessage }, handlers: { createEmpresa } } = useCreateEmpresa();

  const onSubmit = (values) => {
    createEmpresa(values);
  }

  return (
    <Layout title='Nueva empresa' user={user} hideNavbar>
      <h1>Nueva empresa</h1>
      <Form
        onFormSubmit={onSubmit}
        config={NuevaEmpresaForm}
        buttonLabel='Crear'>
        {errorMessage && <ErrorMessage message={errorMessage} />}
      </Form>
    </Layout>
  )
}

export default NuevaEmpresa
