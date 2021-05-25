import React from 'react'
import Layout from '../../components/Layout';
import SeccionesEmpresaList from '../../components/SeccionesEmpresaList';
import { useSeccionesEmpresa } from '../../lib/swr-hooks';

const SeccionesEmpresa = () => {
  const { data = [], isLoading } = useSeccionesEmpresa();
  return (
    <Layout title='Secciones empresa'>
      <h1>Secciones empresa</h1>
      { isLoading ? <span>Loading...</span> : <SeccionesEmpresaList list={data} />}
    </Layout>
  )
}

export default SeccionesEmpresa;
