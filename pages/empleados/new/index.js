import React, { useState, useEffect } from 'react';
import Router from 'next/router'

import { nuevoEmpleado } from '../../../services/empleados.service';
import Form from '../../../components/Form/Form.component';
import Layout from '../../../components/Layout';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';

const NuevoEmpleadoForm = [
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
    label: 'Sección empresa',
    type: 'number',
    name: 'idSeccionEmpresa',
    placeholder: '123',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
];

const NuevaSeccion = () => {
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    return () => {
      setErrorMessage('');
    }
  }, [])

  const onSubmit = async (data) => {
    const { Nombre, Apellido, idSeccionEmpresa } = data;
    const res = await nuevoEmpleado({ Nombre, Apellido, idSeccionEmpresa })
    if (res.errorMessage) return setErrorMessage(res.errorMessage);
    Router.push('/empleados')
  }

  return (
    <Layout title='Nuevo empleado'>
      <h1>Nuevo empleado</h1>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Form onFormSubmit={onSubmit} config={NuevoEmpleadoForm} />
    </Layout>
  )
}

export default NuevaSeccion;
