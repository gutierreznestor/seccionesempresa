import React, { useState } from 'react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import { verify } from 'jsonwebtoken';

import Form from '../../../../components/Form/Form.component';
import Layout from '../../../../components/Layout';
import { editarPerfil } from '../../../../services/perfiles.service';
import parseCookies from '../../../../helpers/parseCookies';
import { redirectToLogin } from '../../../../helpers/redirectToLogin';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage.component';

const EditarPerfilForm = [
  {
    label: 'Nombre',
    type: 'text',
    name: 'Nombre',
    placeholder: 'Supervisor',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
];

const EditarPerfil = ({ data, user, error }) => {
  const { query: { id } } = useRouter();
  const [errorMessage, setErrorMessage] = useState(error);

  const onSubmit = async (data) => {
    const { Nombre } = data;
    const res = await editarPerfil({ user: user?.idUsuario, id, Nombre })
    if (res.errorMessage) {
      setErrorMessage(res.errorMessage);
    };
  }

  return (
    <Layout title='Editar perfil' user={user}>
      <h1>Editar perfil</h1>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Form
        onFormSubmit={onSubmit}
        config={EditarPerfilForm}
        buttonLabel='Editar'
        defaultValues={data} />
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx.req);
  if (!cookie.auth) {
    return redirectToLogin();
  }
  const resp = await fetch(`http://localhost:3000/api/perfiles/get-perfil?id=${ctx.query?.id}`, {
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

export default EditarPerfil;
