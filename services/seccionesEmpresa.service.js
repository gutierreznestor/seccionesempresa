import { Operaciones } from "../constants";
import { addLogSeccionEmpresa } from "./logs.service";
import fetch from 'isomorphic-unfetch';

export const getSeccionesEmpresa = async () => {
  const res = await fetch('http://localhost:3000/api/secciones-empresa/get-secciones-empresa', {
    method: 'GET',
  });
  return await res.json();
}

export const deleteSeccionesEmpresa = async (idSeccionEmpresa) => {
  const res = await fetch('http://localhost:3000/api/secciones-empresa/delete-secciones-empresa', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idSeccionEmpresa,
    }),
  });
  return await res.json();
}

export const getSeccionEmpresa = async (id) => {
  const res = await fetch(`http://localhost:3000/api/secciones-empresa/get-seccion-empresa?id=${id}`, {
    method: 'GET',
  });
  return await res.json();
}

export const editarSeccionEmpresa = async ({ user = '', id, Nombre = '' }) => {
  const url = `http://localhost:3000/api/secciones-empresa/edit-secciones-empresa?id=${id}`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Nombre,
    }),
  });
  await addLogSeccionEmpresa({
    user,
    Operacion: Operaciones.Update,
    Descripcion: Nombre,
  });
  return await res.json();
}

export const nuevaSeccionEmpresa = async ({ user = 1, Nombre = '' }) => {
  const url = `http://localhost:3000/api/secciones-empresa/new-secciones-empresa`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Nombre,
    }),
  });
  const resAddLog = await addLogSeccionEmpresa({
    user,
    Operacion: Operaciones.Create,
    Descripcion: Nombre,
  });
  if (resAddLog.errorMessage) {
    return { errorMessage: resAddLog.errorMessage };
  }
  return await res.json();
}