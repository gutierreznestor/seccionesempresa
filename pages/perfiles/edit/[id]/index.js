import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import { verify } from 'jsonwebtoken';

import Form from '../../../../components/Form/Form.component';
import Layout from '../../../../components/Layout';
import { editarPerfil } from '../../../../services/perfiles.service';
import parseCookies from '../../../../helpers/parseCookies';

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

const EditarPerfil = ({ data, user }) => {
  const { query: { id } } = useRouter();

  const onSubmit = async (data) => {
    const { Nombre } = data;
    const res = await editarPerfil({ user: user?.idUsuario, id, Nombre })
    if (res.errorMessage) return;
    Router.push('/perfiles')
  }

  return (
    <Layout title='Editar perfil'>
      <h1>Editar perfil</h1>
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
  const resp = await fetch(`http://localhost:3000/api/perfiles/get-perfil?id=${ctx.query?.id}`, {
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

export default EditarPerfil;
