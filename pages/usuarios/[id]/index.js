import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Layout from '../../../components/Layout';
import { getUsuario } from '../../../services/usuarios.service';
import { FieldContainer } from './ViewUser.styled';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';

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

  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, [id]);

  return (
    <Layout title="Datos usuario">
      <div>
        <h1>Datos de usuario</h1>
        {errorMessage && <ErrorMessage message={errorMessage} />}
        {loading ? 'Cargando...' :
          !errorMessage && <>
            <ListItem title="Nombre" description={values?.Nombre} />
            <ListItem title="Apellido" description={values?.Apellido} />
            <ListItem title="Usuario" description={values?.Usuario} />
          </>
        }
      </div>
    </Layout>)
}

export default ViewUser;
