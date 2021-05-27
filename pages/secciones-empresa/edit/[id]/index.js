import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';

import Form from '../../../../components/Form/Form.component';
import Layout from '../../../../components/Layout';
import { editarSeccionEmpresa, getSeccionEmpresa } from '../../../../services/seccionesEmpresa.service';

const EditarSeccionForm = [
  {
    label: 'Nombre',
    type: 'text',
    name: 'Nombre',
    placeholder: 'Producción',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
];

const EditarSeccion = () => {
  const { query: { id } } = useRouter();
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);

  const getData = async (id) => {
    setLoading(true);
    const res = await getSeccionEmpresa(id);
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
      const res = await editarSeccionEmpresa({ id, Nombre })
      const json = await res.json()
      if (!res.ok) throw Error(json.message);
      Router.push('/secciones-empresa')
    } catch (e) {
      throw Error(e.message)
    }
  }

  return (
    <Layout title='Editar sección'>
      <h1>Editar sección</h1>
      { loading ?
        <span>Cargando...</span> :
        <Form
          onFormSubmit={onSubmit}
          config={EditarSeccionForm}
          buttonLabel='Editar'
          defaultValues={{ ...values }} />
      }
    </Layout>
  )
}

export default EditarSeccion;
