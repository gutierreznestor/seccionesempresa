import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { getPerfilesUsuario, getUsuario } from '../../../services/usuarios.service';
import Layout from '../../../components/Layout';
import { FieldContainer } from './ViewUser.styled';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import PerfilesUsuarioList from '../../../components/PerfilesUsuarioList/PerfilesUsuarioList.component';
import AppLink from '../../../components/AppLink/AppLink.component';

const ListItem = ({ title, description }) => (
  <FieldContainer>
    <dt>{title}:</dt>
    <dd>{description}</dd>
  </FieldContainer>
);

const ViewUser = () => {
  const { query: { id } } = useRouter();
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [perfiles, setPerfiles] = useState([])


  useEffect(() => {
    const getData = async (id) => {
      setErrorMessage('');
      setLoading(true);
      const res = await getUsuario(id);
      setLoading(false);
      if (res.errorMessage) {
        return setErrorMessage(res.errorMessage);
      }
      setValues({ ...res[0] });
    }
    if (id) {
      getData(id);
    }
  }, [id]);

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
          <ListItem title="Nombre" description={values?.Nombre} />
          <ListItem title="Apellido" description={values?.Apellido} />
          <ListItem title="Usuario" description={values?.Usuario} />
        </>
      }
      <PerfilesUsuarioList list={perfiles} readonly />
      <AppLink
        href={`/usuarios/edit/${id}`}
        title='Editar usuario' />
    </Layout>)
}

export default ViewUser;
