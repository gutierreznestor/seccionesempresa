import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { verify } from 'jsonwebtoken';

import Form from '../../../../components/Form/Form.component';
import Layout from '../../../../components/Layout';
import { addPerfilUsuario, deletePerfilUsuario, editarUsuario, getPerfilesUsuario, getUsuario } from '../../../../services/usuarios.service';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage.component';
import PerfilesUsuarioList from '../../../../components/PerfilesUsuarioList/PerfilesUsuarioList.component';
import parseCookies from '../../../../helpers/parseCookies';

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

const EditUser = ({ data, user }) => {
  const { query: { id } } = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [perfiles, setPerfiles] = useState([]);

  const getProfile = async (id) => {
    setErrorMessage('');
    setLoading(true);
    const res = await getPerfilesUsuario(id);
    setLoading(false);
    if (res.errorMessage) {
      return setErrorMessage(res.errorMessage);
    }
    setPerfiles(res);
  }

  useEffect(() => {
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

  const onEdit = async ({ idPerfil }) => {
    const res = await addPerfilUsuario({
      idUsuario: user.idUsuario.toString(),
      idPerfil: idPerfil.toString()
    });
    setLoading(false);
    if (res.errorMessage) {
      return setErrorMessage(res.errorMessage);
    }
    getProfile(id);
  }

  const onDelete = async ({ idPerfil }) => {
    const res = await deletePerfilUsuario({ user: user.idUsuario, idUsuario: id.toString(), idPerfil: idPerfil.toString() })
    setLoading(false);
    if (res.errorMessage) {
      return setErrorMessage(res.errorMessage);
    }
    getProfile(id);
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
            defaultValues={data} />
        </>
      }
      <PerfilesUsuarioList list={perfiles} onEdit={onEdit} onDelete={onDelete} />
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx.req);
  if (!cookie.auth) {
    redirectToLogin(ctx.res);
  }
  const resp = await fetch(`http://localhost:3000/api/usuarios/get-usuario?id=${ctx.query?.id}`, {
    headers: {
      cookie,
    }
  })
  let res = await resp.json();
  let data = res && res.length ? res[0] : {};
  data.id = ctx.query?.id;
  let user = null;
  verify(cookie.auth, 'secret', async (err, decoded) => {
    if (!err && decoded) {
      user = decoded.user;
    }
  });
  return {
    props: { data, user },
  }
}

export default EditUser;
