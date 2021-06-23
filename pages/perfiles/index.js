import React, { useState } from 'react';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import { verify } from 'jsonwebtoken';

import Layout from '../../components/Layout'
import PerfilesList from '../../components/PerfilesList/PerfilesList.component'
import AppLink from '../../components/AppLink/AppLink.component';
import { deletePerfiles } from '../../services/perfiles.service';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.component';
import parseCookies from '../../helpers/parseCookies';
import { redirectToLogin } from '../../helpers/redirectToLogin';

const Perfiles = ({ data, user }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const onDelete = async (id) => {
    setErrorMessage('');
    const ok = confirm('¿Quieres eliminar el perfil?');
    if (ok) {
      const data = await deletePerfiles({ user: user?.idUsuario, id });
      if (data.errorMessage) return setErrorMessage(data.errorMessage);
      Router.push('perfiles');
    }
  }

  return (
    <Layout title='Perfiles'>
      <h1>Perfiles</h1>
      <AppLink href='/perfiles/new' title='Nuevo Perfil' />
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <PerfilesList
        list={data}
        onDelete={onDelete} />
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx.req);
  if (!cookie.auth) {
    redirectToLogin(ctx.res);
  }
  const respSE = await fetch('http://localhost:3000/api/perfiles/get-perfiles', {
    headers: {
      cookie,
    }
  })
  let res = await respSE.json();
  let data = (res && res.length) ? res : [];
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

export default Perfiles;
