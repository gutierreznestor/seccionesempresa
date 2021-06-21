import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';

import Form from '../../../../components/Form/Form.component';
import Layout from '../../../../components/Layout';
import { editarPerfil, getPerfil } from '../../../../services/perfiles.service';

const EditarPerfilForm = [
  {
    label: 'Nombre',
    type: 'text',
    name: 'Nombre',
    placeholder: 'Supervisor',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
];

const EditarPerfil = () => {
  const { query: { id } } = useRouter();
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);

  const getData = async (id) => {
    setLoading(true);
    const data = await getPerfil(id);
    setValues(data ? data[0] : {});
    setLoading(false);
  }

  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, [id])

  const onSubmit = async (data) => {
    const { Nombre } = data;
    const res = await editarPerfil({ user: 9, id, Nombre })
    if (res.errorMessage) return;
    Router.push('/perfiles')
  }

  return (
    <Layout title='Editar perfil'>
      <h1>Editar perfil</h1>
      {loading ?
        <span>Cargando...</span> :
        <Form
          onFormSubmit={onSubmit}
          config={EditarPerfilForm}
          buttonLabel='Editar'
          defaultValues={{ ...values }} />
      }
    </Layout>
  )
}

export default EditarPerfil;
