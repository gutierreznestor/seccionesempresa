import React, { useState, useEffect } from 'react';
import Router from 'next/router';

import Layout from '../../components/Layout'
import SeccionesEmpresaList from '../../components/SeccionesEmpresaList/SeccionesEmpresaList.component'
import AppLink from '../../components/AppLink/AppLink.component';
import { deleteSeccionesEmpresa, getSeccionesEmpresa } from '../../services/seccionesEmpresa.service';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.component';

const SeccionesEmpresa = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchSeccionesEmpresa = async () => {
    setLoading(true);
    const data = await getSeccionesEmpresa();
    setLoading(false)
    if (data.errorMessage) return setErrorMessage(data.errorMessage)
    setList(data);
  }

  useEffect(() => {
    fetchSeccionesEmpresa();
    return () => {
      setErrorMessage('');
    }
  }, []);

  const onDelete = async (id) => {
    setErrorMessage('');
    const ok = confirm('¿Quieres eliminar la sección?');
    if (ok) {
      setLoading(true);
      const data = await deleteSeccionesEmpresa(id);
      setLoading(false);
      if (data.errorMessage) return setErrorMessage(data.errorMessage);
      fetchSeccionesEmpresa();
      Router.push('secciones-empresa');
    }
  }

  return (
    <Layout title='Secciones empresa'>
      <h1>Secciones empresa</h1>
      <AppLink href='/secciones-empresa/new' title='Nueva sección' />
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {loading ?
        <span>Cargando...</span> :
        <SeccionesEmpresaList
          list={list}
          onDelete={onDelete} />
      }
    </Layout>
  )
}

export default SeccionesEmpresa;
