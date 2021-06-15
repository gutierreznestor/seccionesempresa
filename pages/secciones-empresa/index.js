import React, { useState, useEffect } from 'react';
import Router from 'next/router';

import Layout from '../../components/Layout';
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
    const res = await getSeccionesEmpresa();
    setLoading(false)
    const data = await res.json()
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
      try {
        const res = await deleteSeccionesEmpresa(id);
        setLoading(false);
        const json = await res.json();
        if (!res.ok) return setErrorMessage(json.message);
        fetchSeccionesEmpresa();
        Router.push('secciones-empresa');
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  }

  const onEdit = (id) => {

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
          onDelete={onDelete}
          onEdit={onEdit} />}
    </Layout>
  )
}

export default SeccionesEmpresa;
