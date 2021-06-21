import { Operaciones } from "../constants";
import { addLogPerfil } from "./logs.service";

export const getPerfiles = async () => {
  const res = await fetch('/api/perfiles/get-perfiles', {
    method: 'GET',
  });
  return await res.json();
}

export const deletePerfiles = async ({ user, id }) => {
  const perfil = await getPerfil(id);
  const { Nombre } = perfil[0];
  const res = await fetch('/api/perfiles/delete-perfil', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
    }),
  });
  const resAddLog = await addLogPerfil({ user, Operacion: Operaciones.Delete, Descripcion: Nombre });
  if (resAddLog.errorMessage) {
    return { errorMessage: resAddLog.errorMessage };
  }
  return await res.json();
}

export const getPerfil = async (id) => {
  const res = await fetch(`/api/perfiles/get-perfil?id=${id}`, {
    method: 'GET',
  });
  return await res.json();
}

export const editarPerfil = async ({ user, id, Nombre = '' }) => {
  const url = `/api/perfiles/edit-perfil?id=${id}`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Nombre,
    }),
  });
  const resAddLog = await addLogPerfil({ user, Operacion: Operaciones.Update, Descripcion: Nombre });
  if (resAddLog.errorMessage) {
    return { errorMessage: resAddLog.errorMessage };
  }
  return await res.json();
}

export const nuevoPerfil = async ({ user = '', Nombre = '' }) => {
  const url = `/api/perfiles/new-perfil`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Nombre,
    }),
  });
  const resAddLog = await addLogPerfil({
    user,
    Operacion: Operaciones.Create,
    Descripcion: Nombre,
  });
  if (resAddLog.errorMessage) {
    return { errorMessage: resAddLog.errorMessage };
  }
  return await res.json();
}