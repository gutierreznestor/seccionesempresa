import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';

import Form from '../../../../components/Form/Form.component';
import Layout from '../../../../components/Layout';
import { editarSeccionEmpresa, getSeccionEmpresa } from '../../../../services/seccionesEmpresa.service';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage.component';

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
  const [errorMessage, setErrorMessage] = useState('');

  const getData = async (id) => {
    setLoading(true);
    const data = await getSeccionEmpresa(id);
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
    const res = await editarSeccionEmpresa({ user: 9, id, Nombre })
    if (res.errorMessage) {
      setErrorMessage(res.errorMessage);
    } else {
      Router.push('/secciones-empresa')
    }
  }

  return (
    <Layout title='Editar sección'>
      <h1>Editar sección</h1>
      {loading ?
        <span>Cargando...</span> :
        errorMessage ? <ErrorMessage message={errorMessage} /> :
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
