import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { verify } from 'jsonwebtoken';
import parseCookies from '../../helpers/parseCookies';
import { redirectToLogin } from '../../helpers/redirectToLogin';
import AppLink from '../../components/AppLink/AppLink.component';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.component';

const Auditoria = ({ user, error }) => {
  const [errorMessage] = useState(error);
  return (
    <Layout title="Auditoría" user={user}>
      <AppLink href='/auditoria/seccionesEmpresa' title="Secciones empresa" />
      <AppLink href='/auditoria/empleados' title="Empleados" />
      <AppLink href='/auditoria/usuarios' title="Usuarios" />
      {/* <AppLink href='/auditoria/perfiles' title="Perfiles" /> */}
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx.req);
  if (!cookie.auth) {
    redirectToLogin(ctx.res);
  }
  const res = await fetch('http://localhost:3000/api/perfiles/get-perfiles', {
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
  let data = await res.json();
  let error = null;
  if (data.errorMessage) {
    error = data.errorMessage;
    data = [];
  }
  return {
    props: { user, error },
  }
}

export default Auditoria;
