import React from 'react';
import Layout from '../../components/Layout';
import SeccionesEmpresaList from '../../components/SeccionesEmpresaList';
import { useSeccionesEmpresa } from '../../lib/swr-hooks';
import AppLink from '../../components/AppLink/AppLink.component';

const SeccionesEmpresa = () => {
  const { data = [], isLoading } = useSeccionesEmpresa();
  return (
    <Layout title='Secciones empresa'>
      <h1>Secciones empresa</h1>
      <AppLink href='/secciones-empresa/new' title='Nueva sección' />
      { isLoading ? <span>Cargando...</span> : <SeccionesEmpresaList list={data} />}
    </Layout>
  )
}

export default SeccionesEmpresa;
