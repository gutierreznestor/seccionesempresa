import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import EditarSeccionEmpresa from '../../../../components/Form/EditarSeccionEmpresa.component';
import Layout from '../../../../components/Layout';
import { getSeccionEmpresa } from '../../../../services/seccionesEmpresa.service';

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
      const res = await fetch('/api/seccionesEmpresa/new-secciones-empresa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Nombre,
        }),
      })
      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      Router.push('/')
    } catch (e) {
      throw Error(e.message)
    }
  }

  return (
    <Layout title='Editar sección'>
      <h1>Editar sección</h1>
      { loading ?
        <span>Cargando...</span> :
        <EditarSeccionEmpresa
          onFormSubmit={onSubmit}
          config={EditarSeccionForm}
          defaultValues={{ ...values }} />
      }
    </Layout>
  )
}

export default EditarSeccion;
