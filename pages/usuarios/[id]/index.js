import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { getPerfilesUsuario } from '../../../services/usuarios.service';
import Layout from '../../../components/Layout';
import { FieldContainer } from './ViewUser.styled';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import AppLink from '../../../components/AppLink/AppLink.component';
import { isAllowed } from '../../../hocs/auth';
import customServerSideHoc from '../../../helpers/customServerSideProps';
import useUsuarios from '../../../customHooks/useUsuarios';
import { useSelectUsuario } from '../../../selectors';

const ListItem = ({ title, description }) => (
  <FieldContainer>
    <dt>{title}:</dt>
    <dd>{description}</dd>
  </FieldContainer>
);

const ViewUser = ({ db, user }) => {
  const { query: { id } } = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [perfiles, setPerfiles] = useState([])

  const { handlers: { fetchUsuario } } = useUsuarios({ db, user });
  const { currentUsuario: data } = useSelectUsuario();

  // useEffect(() => {
  //   const getProfile = async (id) => {
  //     setErrorMessage('');
  //     setLoading(true);
  //     const res = await getPerfilesUsuario(id);
  //     setLoading(false);
  //     if (res.errorMessage) {
  //       return setErrorMessage(res.errorMessage);
  //     }
  //     setPerfiles(res);
  //   }
  //   if (id) {
  //     getProfile(id);
  //   }
  // }, [id]);

  React.useEffect(() => {
    if (id) {
      fetchUsuario(id);
    }
  }, [id]);

  return (
    <Layout title="Datos usuario" user={user}>
      <h1>Datos de usuario</h1>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {loading ? 'Cargando...' :
        !errorMessage && <>
          <ListItem title="Nombre" description={data?.Nombre} />
          <ListItem title="Apellido" description={data?.Apellido} />
          <ListItem title="Usuario" description={data?.Usuario} />
        </>
      }
      {/* <PerfilesUsuarioList list={perfiles} readonly /> */}
      <AppLink
        enabled={!isAllowed(['auditor'], user?.Perfiles)}
        href={`/usuarios/edit/${id}`}
        title='Editar usuario' />
    </Layout>)
}

export async function getServerSideProps(ctx) {
  return await customServerSideHoc(ctx);
}

export default ViewUser;
