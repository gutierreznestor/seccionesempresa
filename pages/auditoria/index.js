import React from 'react';
import Layout from '../../components/Layout';
import AppLink from '../../components/AppLink/AppLink.component';
import { customHttps } from '../../helpers/customHttp';
import { decodedJwt } from '../../hocs/auth';

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

export default Auditoria;

Auditoria.getInitialProps = async (ctx) => {
  const decoded = await decodedJwt(ctx.req.cookies.auth)
  return {
    userProfiles: decoded?.user.Perfiles,
  }
}