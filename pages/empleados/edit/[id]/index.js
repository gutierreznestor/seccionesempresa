import React, { useState } from 'react';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import { verify } from 'jsonwebtoken';

import Form from '../../../../components/Form/Form.component';
import Layout from '../../../../components/Layout';
import { getSeccionEmpresa } from '../../../../services/seccionesEmpresa.service';
import { editarEmpleado } from '../../../../services/empleados.service';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage.component';
import Message from '../../../../components/Message/Message.component';
import parseCookies from '../../../../helpers/parseCookies';

const EditarEmpleadoForm = [
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
    label: 'Sección',
    type: 'number',
    name: 'idSeccionEmpresa',
    placeholder: '3',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
];

const EditarEmpleado = ({ data, user }) => {
  const [seccionEmpresa, setSeccionEmpresa] = useState('');
  const [showSeccionEmpresa, setShowSeccionEmpresa] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (formData) => {
    const { Nombre, Apellido, idSeccionEmpresa } = formData;
    const res = await editarEmpleado({ idEmpleado: data.id, user: user?.idUsuario, Nombre, Apellido, idSeccionEmpresa });
    if (res.errorMessage) return setErrorMessage(res.errorMessage);
    Router.push('/empleados')
  }

  const watchingField = async (value) => {
    const data = await getSeccionEmpresa(value);
    if (data.length) {
      setSeccionEmpresa(data[0].Nombre);
    } else {
      setSeccionEmpresa('El id ingresado no existe.');
    }
    setShowSeccionEmpresa(true);
  }

  return (
    <Layout title='Editar empleado'>
      <h1>Editar empleado</h1>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Form
        watcher='idSeccionEmpresa'
        watching={watchingField}
        onFormSubmit={onSubmit}
        config={EditarEmpleadoForm}
        buttonLabel='Editar'
        defaultValues={data}>
        {showSeccionEmpresa && seccionEmpresa ? <Message>Sección: {seccionEmpresa}</Message> : null}
      </Form>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx.req);
  const resp = await fetch(`http://localhost:3000/api/empleados/get-empleado?id=${ctx.query?.id}`, {
    headers: {
      cookie,
    }
  })
  let res = await resp.json();
  let data = res && res.length ? res[0] : {};
  data.id = ctx.query?.id;
  let user = null;
  verify(cookie.auth, 'secret', async (err, decoded) => {
    if (!err && decoded) {
      user = decoded.user;
    }
  });
  return {
    props: { data, user },
  }
}

export default EditarEmpleado;