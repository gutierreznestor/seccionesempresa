import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import { verify } from 'jsonwebtoken';

import Layout from '../../components/Layout'
import SeccionesEmpresaList from '../../components/SeccionesEmpresaList/SeccionesEmpresaList.component'
import AppLink from '../../components/AppLink/AppLink.component';
import { deleteSeccionesEmpresa, getSeccionesEmpresa } from '../../services/seccionesEmpresa.service';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.component';

const SeccionesEmpresa = ({ listSecciones }) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const onDelete = async (id) => {
    setErrorMessage('');
    const ok = confirm('¿Quieres eliminar la sección?');
    if (ok) {
      setLoading(true);
      const data = await deleteSeccionesEmpresa(id);
      setLoading(false);
      if (data.errorMessage) return setErrorMessage(data.errorMessage);
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
          list={listSecciones}
          onDelete={onDelete} />
      }
    </Layout>
  )
}

SeccionesEmpresa.getInitialProps = async (ctx) => {
  const cookie = ctx.req?.headers.cookie;
  const respSE = await fetch('http://localhost:3000/api/secciones-empresa/get-secciones-empresa', {
    headers: {
      cookie,
    }
  })
  const listSecciones = await respSE.json();
  let user = null;
  verify(ctx.req?.cookies.auth, 'secret', async (err, decoded) => {
    if (!err && decoded) {
      user = decoded.user;
    }
  });
  return { listSecciones, user };
}

export default SeccionesEmpresa;
