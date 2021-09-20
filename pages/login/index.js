import React, { useState } from 'react';
import Router from 'next/router';

import Layout from '../../components/Layout';
import Form from '../../components/Form/Form.component';
import { setEmpresa } from '../../services/auth.service';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.component';
import useLogin from '../../customHooks/useLogin';
import parseCookies from '../../helpers/parseCookies';
import useSetEmpresa from '../../customHooks/useSetEmpresa';
import { useSelectAuth } from '../../selectors/useSelectAuth';

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

const Login = ({ db }) => {
  const { errorMessage } = useSelectAuth();
  const {
    handlers: {
      setEmpresa,
    },
  } = useSetEmpresa();

  const { login } = useLogin();

  const onSubmit = async (data) => {
    login(data);
  }

  React.useEffect(() => {
    setEmpresa(db);
  }, []);

  return (
    <Layout title="Login" hideNavbar>
      <Form onFormSubmit={onSubmit} config={LoginForm} buttonLabel='Iniciar sesión'>
        {errorMessage && <ErrorMessage message={errorMessage} />}
      </Form>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx.req);
  const returnProp = {}
  if (cookie.db) {
    returnProp.db = cookie.db;
  }
  return {
    props: returnProp,
  }
}

export default Login;
