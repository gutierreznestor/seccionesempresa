import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { verify } from 'jsonwebtoken';

import { nuevoEmpleado } from '../../../services/empleados.service';
import { getSeccionesEmpresa } from '../../../services/seccionesEmpresa.service';
import Form from '../../../components/Form/Form.component';
import Layout from '../../../components/Layout';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import SeccionesEmpresaList from '../../../components/SeccionesEmpresaList/SeccionesEmpresaList.component';
import Button from '../../../components/Button/Button.component';

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

const NuevoEmpleado = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [seccionesList, setSeccionesList] = useState([]);
  const [showSeccionesEmpresa, setShowSeccionesEmpresa] = useState(false);
  useEffect(() => {
    return () => {
      setErrorMessage('');
    }
  }, []);

  useEffect(() => {
    const fetchSeccionesEmpresa = async () => {
      const data = await getSeccionesEmpresa();
      if (data.errorMessage) return setErrorMessage(data.errorMessage)
      setSeccionesList(data);
    }
    fetchSeccionesEmpresa();
  }, []);

  const onSubmit = async (data) => {
    setErrorMessage('');
    const { Nombre, Apellido, idSeccionEmpresa } = data;
    const res = await nuevoEmpleado({ user: '3', Nombre, Apellido, idSeccionEmpresa })
    if (res.errorMessage) return setErrorMessage(res.errorMessage);
    Router.push('/empleados')
  }

  return (
    <Layout title='Nuevo empleado'>
      <h1>Nuevo empleado</h1>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Form onFormSubmit={onSubmit} config={NuevoEmpleadoForm} />
      <Button label="Ver/Ocultar Secciones" onClick={() => setShowSeccionesEmpresa(prev => !prev)} />
      {showSeccionesEmpresa && <SeccionesEmpresaList list={seccionesList} readonly />}
    </Layout>
  )
}

NuevoEmpleado.getInitialProps = async (ctx) => {
  let user = null;
  verify(ctx.req?.cookies.auth, 'secret', async (err, decoded) => {
    if (!err && decoded) {
      user = decoded.user;
    }
  });
  return { user };
}

export default NuevoEmpleado;
