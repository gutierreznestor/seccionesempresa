import React, { useState, useEffect } from 'react';

import Form from '../../../components/Form/Form.component';
import Layout from '../../../components/Layout';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import SeccionesEmpresaList from '../../../components/SeccionesEmpresaList/SeccionesEmpresaList.component';
import Button from '../../../components/Button/Button.component';
import customServerSideHoc from '../../../helpers/customServerSideProps';
import useSeccionesEmpresa from '../../../customHooks/useSeccionesEmpresa';
import useEmpleados from '../../../customHooks/useEmpleados';

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

const NuevoEmpleado = ({ user, db }) => {
  const [showSeccionesEmpresa, setShowSeccionesEmpresa] = useState(false);
  const { data: { errorMessage }, handlers: { createEmpleado } } = useEmpleados({ DB: db, user });
  const { data: { seccionesEmpresa }, handlers: { fetchSeccionesEmpresa } } = useSeccionesEmpresa({ DB: db, user });

  useEffect(() => {
    fetchSeccionesEmpresa(db);
  }, []);

  const onSubmit = async (data) => {
    const { Nombre, Apellido, idSeccionEmpresa } = data;
    createEmpleado({ user, Nombre, Apellido, idSeccionEmpresa });
  }

  return (
    <Layout title='Nuevo empleado' user={user}>
      <h1>Nuevo empleado</h1>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Form onFormSubmit={onSubmit} config={NuevoEmpleadoForm} />
      <Button label="Ver/Ocultar Secciones" onClick={() => setShowSeccionesEmpresa(prev => !prev)} />
      {showSeccionesEmpresa && <SeccionesEmpresaList list={seccionesEmpresa} readonly />}
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  return await customServerSideHoc(ctx);
}

export default NuevoEmpleado;
