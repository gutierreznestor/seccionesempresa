import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';

import Form from '../../../../components/Form/Form.component';
import Layout from '../../../../components/Layout';
import { editarUsuario, getPerfilesUsuario, getUsuario } from '../../../../services/usuarios.service';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage.component';
import PerfilesUsuarioList from '../../../../components/PerfilesUsuarioList/PerfilesUsuarioList.component';

const EditarUsuarioForm = [
  {
    label: 'Nombre',
    type: 'text',
    name: 'Nombre',
    placeholder: 'Juan',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
  {
    label: 'Apellido',
    type: 'text',
    name: 'Apellido',
    placeholder: 'Dow',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
  {
    label: 'Usuario',
    type: 'text',
    name: 'Usuario',
    placeholder: 'Gabriel',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
];

const EditUser = () => {
  const { query: { id } } = useRouter();
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [perfiles, setPerfiles] = useState([]);

  useEffect(() => {
    const getData = async (id) => {
      setLoading(true);
      const data = await getUsuario(id);
      setValues(data ? data[0] : {});
      setLoading(false);
    }
    if (id) {
      getData(id);
    }
    return () => {
      setErrorMessage('');
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
      console.log(res)
      setPerfiles(res);
    }
    if (id) {
      getProfile(id);
    }
  }, [id]);

  const onSubmit = async (data) => {
    const { Nombre, Apellido, Usuario } = data;
    const res = await editarUsuario({ id, Nombre, Apellido, Usuario })
    if (res.errorMessage) return setErrorMessage(res.errorMessage);
    Router.push('/usuarios')
  }

  const onEdit = ({ idPerfil }) => {
    console.log({ idPerfil, idUsuario: id });
  }

  return (
    <Layout title='Editar usuario'>
      <h1>Editar usuario</h1>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {loading ?
        <span>Cargando...</span> :
        <>
          <Form
            onFormSubmit={onSubmit}
            config={EditarUsuarioForm}
            buttonLabel='Guardar'
            defaultValues={{ ...values }} />
        </>
      }
      <PerfilesUsuarioList list={perfiles} onEdit={onEdit} />
    </Layout>
  )
}

export default EditUser;
