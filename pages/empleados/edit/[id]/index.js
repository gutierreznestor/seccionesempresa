import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';

import Form from '../../../../components/Form/Form.component';
import Layout from '../../../../components/Layout';
import { getSeccionEmpresa } from '../../../../services/seccionesEmpresa.service';
import { editarEmpleado, getEmpleado } from '../../../../services/empleados.service';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage.component';

const EditarSeccionForm = [
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
    label: 'Sección',
    type: 'number',
    name: 'idSeccionEmpresa',
    placeholder: '3',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
];

const EditarSeccion = () => {
  const { query: { id } } = useRouter();
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [seccionEmpresa, setSeccionEmpresa] = useState('');
  const [showSeccionEmpresa, setShowSeccionEmpresa] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getData = async (id) => {
    setLoading(true);
    const res = await getEmpleado(id);
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
      const res = await editarEmpleado({ id, Nombre, Apellido, idSeccionEmpresa })
      const json = await res.json()
      if (!res.ok) return setErrorMessage(json.message);
      Router.push('/empleados')
    } catch (e) {
      setErrorMessage(e.message);
    }
  }
  const watchingField = async (value) => {
    const res = await getSeccionEmpresa(value)
    const seccion = await res.json();
    if (seccion) {
      if (seccion.length) {
        setSeccionEmpresa(seccion[0].Nombre);
      } else {
        setSeccionEmpresa('El id ingresado no existe.');
      }
      setShowSeccionEmpresa(true);
    }
  }

  return (
    <Layout title='Editar empleado'>
      <h1>Editar empleado</h1>
      { errorMessage && <ErrorMessage message={errorMessage} />}
      { loading ?
        <span>Cargando...</span> :
        <>
          <Form
            watcher='idSeccionEmpresa'
            watching={watchingField}
            onFormSubmit={onSubmit}
            config={EditarSeccionForm}
            buttonLabel='Editar'
            defaultValues={{ ...values }} />
          { showSeccionEmpresa && seccionEmpresa ? <span>{seccionEmpresa}</span> : null}
        </>
      }
    </Layout>
  )
}

export default EditarSeccion;
