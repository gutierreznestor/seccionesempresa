import React, { useState, useEffect } from 'react';
import Router from 'next/router';

import Layout from '../../components/Layout';
import AppLink from '../../components/AppLink/AppLink.component';
import UsuariosList from '../../components/UsuariosList/UsuariosList.component';
import { deleteUsuario, getUsuarios } from '../../services/usuarios.service';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.component';

const Usuarios = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchUsuarios = async () => {
    setLoading(true);
    const data = await getUsuarios();
    setLoading(false);
    if (data.errorMessage) return setErrorMessage(data.errorMessage)
    setList(data);
  }

  useEffect(() => {
    fetchUsuarios();
    return () => {
      setErrorMessage('');
    }
  }, []);

  const onDelete = async (id) => {
    const ok = confirm('¿Quieres eliminar al usuario?');
    if (ok) {
      setLoading(true);
      const data = await deleteUsuario({ idUsuario: 1, id });
      fetchUsuarios();
      if (data.errorMessage) return setErrorMessage(data.errorMessage);
      Router.push('usuarios');
    }
  }

  return (
    <Layout title='Usuarios'>
      <h1>Usuarios</h1>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <AppLink href='/usuarios/new' title='Nuevo usuario' />
      {loading ?
        <span>Cargando...</span> :
        <UsuariosList
          list={list}
          onDelete={onDelete}
        />}
    </Layout>
  )
}

export default Usuarios;
