import React, { useState, useEffect } from 'react';

import Layout from '../../components/Layout';
import SeccionesEmpresaList from '../../components/SeccionesEmpresaList';
import AppLink from '../../components/AppLink/AppLink.component';
import { deleteSeccionesEmpresa, getSeccionesEmpresa } from '../../services/seccionesEmpresa.service';

const SeccionesEmpresa = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const fetchSeccionesEmpresa = async () => {
    setLoading(true);
    const res = await getSeccionesEmpresa();
    setLoading(false)
    const data = await res.json()
    setList(data);
  }

  useEffect(() => {
    fetchSeccionesEmpresa();
  }, []);

  const onDelete = async (id) => {
    const ok = confirm('¿Quieres eliminar la sección?');
    if (ok) {
      setLoading(true);
      const res = await deleteSeccionesEmpresa(id);
      const json = await res.json();
      if (!res.ok) throw Error(json.message)
      fetchSeccionesEmpresa()
    }
  }

  const onEdit = (id) => {

  }

  return (
    <Layout title='Secciones empresa'>
      <h1>Secciones empresa</h1>
      <AppLink href='/secciones-empresa/new' title='Nueva sección' />
      { loading ?
        <span>Cargando...</span> :
        <SeccionesEmpresaList
          list={list}
          onDelete={onDelete}
          onEdit={onEdit} />}
    </Layout>
  )
}

export default SeccionesEmpresa;
