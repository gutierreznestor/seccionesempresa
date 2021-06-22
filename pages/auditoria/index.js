import React from 'react';
import Layout from '../../components/Layout';
import AppLink from '../../components/AppLink/AppLink.component';
import { verify } from 'jsonwebtoken';
import parseCookies from '../../helpers/parseCookies';

const Auditoria = ({ user }) => {
  return (
    <Layout title="Auditoría">
      <AppLink href='/auditoria/seccionesEmpresa' title="Secciones empresa" />
      <AppLink href='/auditoria/empleados' title="Empleados" />
      <AppLink href='/auditoria/usuarios' title="Usuarios" />
      <AppLink href='/auditoria/perfiles' title="Perfiles" />
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx.req);
  let user = null;
  verify(cookie.auth, 'secret', async (err, decoded) => {
    if (!err && decoded) {
      user = decoded.user;
    }
  });
  return {
    props: { user },
  }
}

export default Auditoria;
