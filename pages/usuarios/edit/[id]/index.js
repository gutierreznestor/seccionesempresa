import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';

import Form from '../../../../components/Form/Form.component';
import Layout from '../../../../components/Layout';
import { editarUsuario, getUsuario } from '../../../../services/usuarios.service';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage.component';

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

  const getData = async (id) => {
    setLoading(true);
    const data = await getUsuario(id);
    setValues(data ? data[0] : {});
    setLoading(false);
  }

  useEffect(() => {
    if (id) {
      getData(id);
    }
    return () => {
      setErrorMessage('');
    }
  }, [id])

  const onSubmit = async (data) => {
    const { Nombre, Apellido, Usuario } = data;
    const res = await editarUsuario({ id, Nombre, Apellido, Usuario })
    if (res.errorMessage) return setErrorMessage(res.errorMessage);
    Router.push('/usuarios')
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
            buttonLabel='Editar'
            defaultValues={{ ...values }} />
        </>
      }
    </Layout>
  )
}

export default EditUser;
