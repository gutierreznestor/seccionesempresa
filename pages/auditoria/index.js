import React from 'react';
import Layout from '../../components/Layout';
import AppLink from '../../components/AppLink/AppLink.component';

const Auditoria = () => {
  return (
    <Layout title="Auditoría">
      <AppLink href='/auditoria/usuarios' title="Usuarios" />
      <AppLink href='/auditoria/empleados' title="Empleados" />
    </Layout>
  )
}

export default Auditoria;
