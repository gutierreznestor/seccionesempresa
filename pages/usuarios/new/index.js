import React, { useState, useEffect } from 'react';
import Router from 'next/router'

import { nuevoUsuario } from '../../../services/usuarios.service';
import Form from '../../../components/Form/Form.component';
import Layout from '../../../components/Layout';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';

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

const NuevoUsuario = () => {
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    return () => {
      setErrorMessage('');
    }
  }, [])

  const onSubmit = async (data) => {
    const { Usuario, Nombre, Apellido, Password } = data;
    try {
      const res = await nuevoUsuario({ Usuario, Nombre, Apellido, Password })
      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      Router.push('/usuarios')
    } catch (e) {
      setErrorMessage(e.message);
    }
  }

  return (
    <Layout title='Nuevo usuario'>
      <h1>Nuevo usuario</h1>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Form onFormSubmit={onSubmit} config={NuevoUsuarioForm} />
    </Layout>
  )
}

export default NuevoUsuario;
