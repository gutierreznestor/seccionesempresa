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
    const res = await getPerfil(id);
    const data = await res.json();
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
    try {
      const res = await editarPerfil({ id, Nombre })
      const json = await res.json()
      if (!res.ok) throw Error(json.message);
      Router.push('/perfiles')
    } catch (e) {
      throw Error(e.message)
    }
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
