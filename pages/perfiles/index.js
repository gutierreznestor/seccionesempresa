import React, { useState, useEffect } from 'react';
import Router from 'next/router';

import Layout from '../../components/Layout'
import PerfilesList from '../../components/PerfilesList/PerfilesList.component'
import AppLink from '../../components/AppLink/AppLink.component';
import { deletePerfiles, getPerfiles } from '../../services/perfiles.service';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.component';

const Perfiles = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchPerfiles = async () => {
    setLoading(true);
    const data = await getPerfiles();
    setLoading(false);
    if (data.errorMessage) return setErrorMessage(data.errorMessage)
    setList(data);
  }

  useEffect(() => {
    fetchPerfiles();
    return () => {
      setErrorMessage('');
    }
  }, []);

  const onDelete = async (id) => {
    setErrorMessage('');
    const ok = confirm('¿Quieres eliminar el perfil?');
    if (ok) {
      setLoading(true);
      const data = await deletePerfiles(id);
      setLoading(false);
      if (data.errorMessage) return setErrorMessage(data.errorMessage);
      fetchPerfiles();
      Router.push('perfiles');
    }
  }

  const onEdit = (id) => {

  }

  return (
    <Layout title='Perfiles'>
      <h1>Perfiles</h1>
      <AppLink href='/perfiles/new' title='Nuevo Perfil' />
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {loading ?
        <span>Cargando...</span> :
        <PerfilesList
          list={list}
          onDelete={onDelete}
          onEdit={onEdit} />}
    </Layout>
  )
}

export default Perfiles;
