import React from 'react';

import Layout from '../../components/Layout';
import AppLink from '../../components/AppLink/AppLink.component';
import UsuariosList from '../../components/UsuariosList/UsuariosList.component';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.component';
import { isAllowed } from '../../hocs/auth';
import customServerSideHoc from '../../helpers/customServerSideProps';
import useUsuarios from '../../customHooks/useUsuarios';

const Usuarios = ({ user, db }) => {
  const {
    data: { usuarios, errorMessage },
    handlers: { fetchUsuarios, deleteUsuario }
  } = useUsuarios({ DB: db, user })

  React.useEffect(() => {
    fetchUsuarios()
  }, []);

  const onDelete = async (id) => {
    const ok = confirm('¿Quieres eliminar al usuario?');
    if (ok) {
      deleteUsuario(id)
    }
  }
  return (
    <Layout title='Usuarios' user={user}>
      <h1>Usuarios</h1>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <AppLink href='/usuarios/new' title='Nuevo usuario' enabled={!isAllowed(['auditor'], user?.Perfiles)} />
      <UsuariosList
        list={usuarios}
        onDelete={onDelete}
        user={user}
      />
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  return await customServerSideHoc(ctx);
}

export default Usuarios;
