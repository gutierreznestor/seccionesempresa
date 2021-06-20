import React from 'react';
import Layout from '../../components/Layout';
import AppLink from '../../components/AppLink/AppLink.component';

const Auditoria = () => {
  return (
    <Layout title="Auditoría">
      <AppLink href='/auditoria/seccionesEmpresa' title="Secciones empresa" />
      <AppLink href='/auditoria/empleados' title="Empleados" />
      <AppLink href='/auditoria/usuarios' title="Usuarios" />
    </Layout>
  )
}

export default Auditoria;
