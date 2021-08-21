import React, { useState } from 'react';
import Router from 'next/router';

import Layout from '../../components/Layout';
import Form from '../../components/Form/Form.component';
import { login, setEmpresa } from '../../services/auth.service';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.component';
import Select from '../../components/Select/Select.component';
import AppLink from '../../components/AppLink/AppLink.component';
import useGetEmpresas from '../../customHooks/useGetEmpresas';

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
  const [selected, setSelected] = useState('');
  const {
    data: { empresasDropdown },
    handlers: { fetchEmpresas },
  } = useGetEmpresas();
  const onSelect = (value) => {
    setErrorMessage('');
    setSelected(value);
    setEmpresa(value);
    localStorage.setItem('db', value);
  }

  const onSubmit = async (data) => {
    setErrorMessage('');
    const { Usuario, Password } = data;
    const res = await login({ Usuario, Password, db: selected })
    if (res.errorMessage) return setErrorMessage(res.errorMessage);
    Router.push('/')
  }

  React.useEffect(() => {
    fetchEmpresas();
  }, []);

  return (
    <Layout title="Login" hideNavbar>
      <h1>Iniciar sesión</h1>
      <Select options={empresasDropdown} onSelect={onSelect} selected={selected} />
      <Form onFormSubmit={onSubmit} config={LoginForm} buttonLabel='Iniciar sesión'>
        {errorMessage && <ErrorMessage message={errorMessage} />}
      </Form>
      <AppLink href='nueva-empresa' title='Crear nueva empresa' />
    </Layout>
  )
}

export default Login;
