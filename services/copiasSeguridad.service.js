import fetch from 'isomorphic-unfetch';

export const makeCopiaSeguridad = async ({ db }) => {
  const url = `http://localhost:3000/api/copiasSeguridad/make-copia-seguridad`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      db,
    }),
  });
  return await res.json();
};

export const leerArchivos = async ({ db }) => {
  const url = `http://localhost:3000/api/copiasSeguridad/leer-archivos?db=${db}`;
  const res = await fetch(url, {
    method: 'GET',
  });
  return await res.json();
}

export const restaurarCopiaSeguridad = async ({ db, fileName }) => {
  const url = `http://localhost:3000/api/copiasSeguridad/restaurar-copia-seguridad`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      db,
      fileName,
    }),
  });
  return await res.json();
}