import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { getUsuario } from '../../../services/usuarios.service';
import { FieldContainer } from './ViewUser.styled';

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
    setLoading(true);
    const res = await getUsuario(id);
    const data = await res.json();
    setValues(data ? data[0] : {});
    setLoading(false);
  }

  console.log({ values })

  useEffect(() => {
    if (id) {
      getData(id);
    }
    return () => {
      setErrorMessage('');
    }
  }, [id])
  return (
    <Layout title="Datos usuario">
      <div>
        <h1>Datos de usuario</h1>
        {loading ? 'Cargando...' :
          <>
            <ListItem title="Nombre" description={values.Nombre} />
            <ListItem title="Apellido" description={values.Apellido} />
            <ListItem title="Usuario" description={values.Usuario} />
            <ListItem title="Perfil" description={values.Perfil} />
          </>
        }
      </div>
    </Layout>)
}

export default ViewUser;
