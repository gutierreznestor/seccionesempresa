import React, { useState } from 'react';
import Router from 'next/router';

import Layout from '../../components/Layout';
import Form from '../../components/Form/Form.component';
import { login } from '../../services/auth.service';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.component';

const LoginForm = [
  {
    label: 'Usuario',
    type: 'text',
    name: 'Usuario',
    placeholder: 'Gabriel',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
  {
    label: 'Contraseña',
    type: 'password',
    name: 'Password',
    placeholder: 'Ingrese contraseña',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
];

const Registro = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    setErrorMessage('');
    const { Usuario, Password } = data;
    const data = await login({ Usuario, Password })
    if (data.errorMessage) return setErrorMessage(data.errorMessage);
    Router.push('/')
  }

  return (
    <Layout title="Login" hideNavbar>
      <h1>Iniciar sesión</h1>
      <Form onFormSubmit={onSubmit} config={LoginForm}>
        {errorMessage && <ErrorMessage message={errorMessage} />}
      </Form>
    </Layout>
  )
}

export default Registro
