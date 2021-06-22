import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import { verify } from 'jsonwebtoken';

import Form from '../../../../components/Form/Form.component';
import Layout from '../../../../components/Layout';
import { editarSeccionEmpresa } from '../../../../services/seccionesEmpresa.service';
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

const EditarSeccion = ({ data, user }) => {
  const [values, setValues] = useState(data);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // const getData = async (id) => {
  //   setLoading(true);
  //   // const data = await getSeccionEmpresa(id);
  //   setValues(data ? data[0] : {});
  //   setLoading(false);
  // }

  // useEffect(() => {
  //   if (id) {
  //     // getData(id);
  //   }
  // }, [id])

  const onSubmit = async (data) => {
    const { id, Nombre } = data;
    const res = await editarSeccionEmpresa({ user: user?.idUsuario, id, Nombre })
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

EditarSeccion.getInitialProps = async (ctx) => {
  const cookie = ctx.req?.cookies.auth;
  const respSE = await fetch(`http://localhost:3000/api/secciones-empresa/get-seccion-empresa?id=${ctx.query?.id}`, {
    headers: {
      cookie,
    }
  })
  let res = await respSE.json();
  let data = res && res.length ? res[0] : {};
  data.id = ctx.query?.id;
  let user = null;
  verify(ctx.req?.cookies.auth, 'secret', async (err, decoded) => {
    if (!err && decoded) {
      user = decoded.user;
    }
  });
  return { data, user };
}