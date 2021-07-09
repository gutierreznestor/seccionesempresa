import React, { useState } from 'react';
import Router from 'next/router';

import Layout from '../../components/Layout';
import Form from '../../components/Form/Form.component';
import { login, setEmpresa } from '../../services/auth.service';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.component';
import Select from '../../components/Select/Select.component';

const options = [
  { label: 'empresa', value: 'empresa' },
  { label: 'empresa 2', value: 'empresa2' },
];

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

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [selected, setSelected] = useState('empresa');

  const onSelect = (value) => {
    setErrorMessage('');
    setSelected(value);
    setEmpresa(value);
  }

  const onSubmit = async (data) => {
    setErrorMessage('');
    const { Usuario, Password } = data;
    const res = await login({ Usuario, Password, db: selected })
    if (res.errorMessage) return setErrorMessage(res.errorMessage);
    Router.push('/')
  }

  React.useEffect(() => {
    setEmpresa(selected);
  }, []);

  return (
    <Layout title="Login" hideNavbar>
      <h1>Iniciar sesión</h1>
      <Select options={options} onSelect={onSelect} />
      <Form onFormSubmit={onSubmit} config={LoginForm}>
        {errorMessage && <ErrorMessage message={errorMessage} />}
      </Form>
    </Layout>
  )
}

export default Login;
