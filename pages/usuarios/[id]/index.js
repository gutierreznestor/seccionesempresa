import React from 'react';
import { useRouter } from 'next/router';

import Layout from '../../../components/Layout';
import FieldContainer from './ViewUser.styled';
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

  const { handlers: { fetchUsuario } } = useUsuarios({ db, user });
  const { currentUsuario: data, loading, errorMessage } = useSelectUsuario();

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
