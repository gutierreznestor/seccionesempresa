import React, { useState, useEffect } from 'react';
import Router from 'next/router'

import { nuevoUsuario } from '../../../services/usuarios.service';
import Form from '../../../components/Form/Form.component';
import Layout from '../../../components/Layout';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import customServerSideHoc from '../../../helpers/customServerSideProps';
import useUsuarios from '../../../customHooks/useUsuarios';

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

const NuevoUsuario = ({ db, user }) => {
  const {
    data: { errorMessage },
    handlers: { createUsuario },
  } = useUsuarios({ db, user });

  useEffect(() => {

  }, [])

  const onSubmit = (data) => {
    createUsuario(data);
  }

  return (
    <Layout title='Nuevo usuario' user={user} h1Title="Nuevo usuario">
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Form onFormSubmit={onSubmit} config={NuevoUsuarioForm} />
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  return await customServerSideHoc(ctx);
}

export default NuevoUsuario;
