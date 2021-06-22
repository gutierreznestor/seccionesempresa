import React from 'react';
import Layout from '../../components/Layout';
import AppLink from '../../components/AppLink/AppLink.component';
import fetch from 'isomorphic-unfetch';
import { verify } from 'jsonwebtoken';

const Auditoria = ({ userProfiles }) => {
  return (
    <Layout title="Auditoría">
      <AppLink href='/auditoria/seccionesEmpresa' title="Secciones empresa" />
      <AppLink href='/auditoria/empleados' title="Empleados" />
      <AppLink href='/auditoria/usuarios' title="Usuarios" />
      <AppLink href='/auditoria/perfiles' title="Perfiles" />
    </Layout>
  )
}

Auditoria.getInitialProps = async (ctx) => {
  const cookie = ctx.req?.cookies.auth;
  const respSE = await fetch(`http://localhost:3000/api/secciones-empresa/get-secciones-empresa`, {
    headers: {
      cookie,
    }
  })
  let res = await respSE.json();
  let data = res && res.length ? res[0] : {};
  data.id = ctx.query?.id;
  let user = null;
  verify(ctx.req?.cookies.auth, 'secret', async (err, decoded) => {
    if (!err && decoded) {
      user = decoded.user;
    }
  });
  return { data, user };
};

export default Auditoria;
