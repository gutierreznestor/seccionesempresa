import React from 'react';
import Router from 'next/router';

import Layout from '../../components/Layout';
import Form from '../../components/Form/Form.component';
import { login } from '../../services/auth.service';

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

  const onSubmit = async (data) => {
    const { Usuario, Password } = data;
    try {
      const res = await login({ Usuario, Password })
      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      Router.push('/')
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <Layout title="Login" hideNavbar>
      <h1>Inicio de sesión</h1>
      <Form onFormSubmit={onSubmit} config={LoginForm} />
    </Layout>
  )
}

export default Registro
