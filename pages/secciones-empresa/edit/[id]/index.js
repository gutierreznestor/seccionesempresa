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

const EditarSeccion = ({ data, user }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
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
      <h1>Editar sección</h1>
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
    redirectToLogin(ctx.res);
  }
  const resp = await fetch(`http://localhost:3000/api/secciones-empresa/get-seccion-empresa?id=${ctx.query?.id}`, {
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
