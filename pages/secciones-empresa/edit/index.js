import React from 'react';

import NuevaSeccionEmpresa from '../../../components/Form/NuevaSeccionEmpresa.component';
import Layout from '../../../components/Layout';

const EditarSeccionForm = [
  {
    label: 'Nombre',
    type: 'text',
    name: 'Nombre',
    placeholder: 'Producción',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
    value: 'asdasd',
  },
];

const EditarSeccion = () => {

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
      <NuevaSeccionEmpresa
        onFormSubmit={onSubmit}
        config={EditarSeccionForm}
        defaultValues={{ Nombre: 'Test' }} />
    </Layout>
  )
}

export default EditarSeccion;
