import { addLogUsuario } from './logs.service';
import { Operaciones } from '../constants';

export const getUsuarios = async () => {
  const res = await fetch('/api/usuarios/get-usuarios', {
    method: 'GET',
  });
  return await res.json();
}

export const deleteUsuario = async ({ idUsuario, id }) => {
  const user = await getUsuario(id);
  const { Apellido, Nombre, Usuario } = user[0];
  const res = await fetch('/api/usuarios/delete-usuario', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
    }),
  });
  await addLogUsuario({ idUsuario, Operacion: Operaciones.Delete, Descripcion: `${Apellido}, ${Nombre} (${Usuario})` });
  return await res.json();
}

export const getUsuario = async (id) => {
  const res = await fetch(`/api/usuarios/get-usuario?id=${id}`, {
    method: 'GET',
  });
  return await res.json();
}

export const editarUsuario = async ({ id, Nombre = '', Apellido = '', Usuario = '' }) => {
  const url = `/api/usuarios/edit-usuario?id=${id}`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Nombre,
      Apellido,
      Usuario,
    }),
  });
  await addLogUsuario({ idUsuario: id, Operacion: Operaciones.Update, Descripcion: `${Apellido}, ${Nombre} (${Usuario})` });
  return await res.json();
}

export const nuevoUsuario = async ({ idUsuario, Usuario, Nombre, Apellido, Password }) => {
  const url = `/api/usuarios/new-usuario`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Usuario,
      Nombre,
      Apellido,
      Password,
    }),
  });
  await addLogUsuario({ idUsuario, Operacion: Operaciones.Create, Descripcion: `${Apellido}, ${Nombre}` });
  return await res.json();
}

export const getPerfilesUsuario = async (id) => {
  const res = await fetch(`/api/usuarios/get-perfiles-usuario?id=${id}`, {
    method: 'GET',
  });
  return await res.json();
}

export const getPerfilUsuario = async (idUsuario, idPerfil) => {
  const res = await fetch(`/api/usuarios/get-perfil-usuario?idUsuario=${idUsuario}&idPerfil=${idPerfil}`, {
    method: 'GET',
  });
  return await res.json();
}

export const addPerfilUsuario = async ({ idUsuario, idPerfil }) => {
  const hasProfile = await getPerfilUsuario(idUsuario, idPerfil);
  if (hasProfile.length) {
    return { errorMessage: 'No se puede agregar el mismo perfil.' }
  }
  const res = await fetch('/api/usuarios/add-perfil-usuario', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idUsuario,
      idPerfil,
    }),
  });
  return await res.json();
}

export const deletePerfilUsuario = async ({ idUsuario, idPerfil }) => {
  const res = await fetch('/api/usuarios/delete-perfil-usuario', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idUsuario,
      idPerfil,
    }),
  });
  return await res.json();
}
