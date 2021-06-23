import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { getPerfilesUsuario, getUsuario } from '../../../services/usuarios.service';
import Layout from '../../../components/Layout';
import { FieldContainer } from './ViewUser.styled';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import PerfilesUsuarioList from '../../../components/PerfilesUsuarioList/PerfilesUsuarioList.component';
import AppLink from '../../../components/AppLink/AppLink.component';
import parseCookies from '../../../helpers/parseCookies';
import { verify } from 'jsonwebtoken';

const ListItem = ({ title, description }) => (
  <FieldContainer>
    <dt>{title}:</dt>
    <dd>{description}</dd>
  </FieldContainer>
);

const ViewUser = ({ data }) => {
  const { query: { id } } = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [perfiles, setPerfiles] = useState([])

  useEffect(() => {
    const getProfile = async (id) => {
      setErrorMessage('');
      setLoading(true);
      const res = await getPerfilesUsuario(id);
      setLoading(false);
      if (res.errorMessage) {
        return setErrorMessage(res.errorMessage);
      }
      setPerfiles(res);
    }
    if (id) {
      getProfile(id);
    }
  }, [id]);

  return (
    <Layout title="Datos usuario">
      <h1>Datos de usuario</h1>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {loading ? 'Cargando...' :
        !errorMessage && <>
          <ListItem title="Nombre" description={data?.Nombre} />
          <ListItem title="Apellido" description={data?.Apellido} />
          <ListItem title="Usuario" description={data?.Usuario} />
        </>
      }
      <PerfilesUsuarioList list={perfiles} readonly />
      <AppLink
        href={`/usuarios/edit/${id}`}
        title='Editar usuario' />
    </Layout>)
}

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx.req);
  if (!cookie.auth) {
    redirectToLogin(ctx.res);
  }
  const resp = await fetch(`http://localhost:3000/api/usuarios/get-usuario?id=${ctx.query?.id}`, {
    headers: {
      cookie,
    }
  })
  let res = await resp.json();
  let data = res && res.length ? res[0] : {};
  data.id = ctx.query?.id;
  let user = null;
  verify(cookie.auth, 'secret', async (err, decoded) => {
    if (!err && decoded) {
      user = decoded.user;
    }
  });
  return {
    props: { data, user },
  }
}

export default ViewUser;
