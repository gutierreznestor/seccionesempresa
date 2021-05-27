import React, { useState } from 'react';
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

  const onSubmit = async (data) => {
    const { Nombre, Apellido, idSeccionEmpresa } = data;
    try {
      const res = await nuevoEmpleado({ Nombre, Apellido, idSeccionEmpresa })
      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      Router.push('/empleados')
    } catch (e) {
      setErrorMessage(e.message);
    }
  }

  return (
    <Layout title='Nuevo empleado'>
      <h1>Nuevo empleado</h1>
      { errorMessage && <ErrorMessage message={errorMessage} />}
      <Form onFormSubmit={onSubmit} config={NuevoEmpleadoForm} />
    </Layout>
  )
}

export default NuevaSeccion;
