import React, { useState } from 'react';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import { verify } from 'jsonwebtoken';

import Form from '../../../../components/Form/Form.component';
import Layout from '../../../../components/Layout';
import { editarSeccionEmpresa } from '../../../../services/seccionesEmpresa.service';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage.component';
import parseCookies from '../../../../helpers/parseCookies';
import { redirectToLogin } from '../../../../helpers/redirectToLogin';

const EditarSeccionForm = [
  {
    label: 'Nombre',
    type: 'text',
    name: 'Nombre',
    placeholder: 'Producción',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
];

const EditarSeccion = ({ data, user, error }) => {
  const [errorMessage, setErrorMessage] = useState(error);

  const onSubmit = async (data) => {
    setErrorMessage('');
    const { id, Nombre } = data;
    const res = await editarSeccionEmpresa({ user: user?.idUsuario, id, Nombre })
    if (res.errorMessage) {
      setErrorMessage(res.errorMessage);
    } else {
      Router.push('/secciones-empresa')
    }
  }

  return (
    <Layout title='Editar sección' user={user}>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Form
        onFormSubmit={onSubmit}
        config={EditarSeccionForm}
        buttonLabel='Editar'
        defaultValues={data} />
    </Layout>
  )
}

export default EditarSeccion;

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx.req);
  if (!cookie.auth) {
    return redirectToLogin();
  }
  const resp = await fetch(`http://localhost:3000/api/secciones-empresa/get-seccion-empresa?id=${ctx.query?.id}`, {
    headers: {
      cookie,
    }
  })
  let user = null;
  verify(cookie.auth, 'secret', async (err, decoded) => {
    if (!err && decoded) {
      user = decoded.user;
    }
  });
  let data = await resp.json();
  let error = null;
  if (data.errorMessage) {
    error = data.errorMessage;
    data = [];
  }
  return {
    props: { data, user, error },
  }
}
