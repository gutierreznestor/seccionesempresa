import React, { useState, useEffect } from 'react';
import Router from 'next/router'

import { nuevoUsuario } from '../../../services/usuarios.service';
import Form from '../../../components/Form/Form.component';
import Layout from '../../../components/Layout';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import parseCookies from '../../../helpers/parseCookies';
import { verify } from 'jsonwebtoken';

const NuevoUsuarioForm = [
  {
    label: 'Nombre',
    type: 'text',
    name: 'Nombre',
    placeholder: 'Juan',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
  {
    label: 'Apellido',
    type: 'text',
    name: 'Apellido',
    placeholder: 'Dow',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
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

const NuevoUsuario = ({ user }) => {
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    return () => {
      setErrorMessage('');
    }
  }, [])

  const onSubmit = async (data) => {
    const { Usuario, Nombre, Apellido, Password } = data;
    const res = await nuevoUsuario({ idUsuario: user.idUsuario, Usuario, Nombre, Apellido, Password })
    if (res.errorMessage) return setErrorMessage(res.errorMessage);
    Router.push('/usuarios')
  }

  return (
    <Layout title='Nuevo usuario'>
      <h1>Nuevo usuario</h1>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Form onFormSubmit={onSubmit} config={NuevoUsuarioForm} />
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx.req);
  if (!cookie.auth) {
    redirectToLogin(ctx.res);
  }
  let user = null;
  verify(cookie.auth, 'secret', async (err, decoded) => {
    if (!err && decoded) {
      user = decoded.user;
    }
  });
  return {
    props: { user },
  }
}

export default NuevoUsuario;
