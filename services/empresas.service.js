import fetch from 'isomorphic-unfetch';

export const nuevaEmpresa = async ({ empresa, DB }) => {
  const existe = await existeEmpresa(empresa);
  if (existe && existe.length) {
    return { errorMessage: 'Ya existe una empresa con ese nombre.' };
  }

  let url = `http://localhost:3000/api/empresas/nueva-empresa`;
  let res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      empresa,
      DB,
    }),
  });
  if (res.errorMessage) {
    return await res.json({ errorMessage: res.errorMessage });
  }
  url = `http://localhost:3000/api/empresas/nueva-base`;
  res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      DB,
    }),
  });
  url = `http://localhost:3000/api/empresas/tablas`;
  res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      DB,
    }),
  });
  url = `http://localhost:3000/api/empresas/data`;
  res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      DB,
    }),
  });
  return await res.json();
};

export const existeEmpresa = async (empresa) => {
  const res = await fetch(`http://localhost:3000/api/empresas/existe-empresa?empresa=${empresa}`, {
    method: 'GET',
  });
  return await res.json();
}

export const getEmpresas = async () => {
  const res = await fetch('http://localhost:3000/api/empresas/get-empresas', {
    method: 'GET',
  });
  return await res.json();
}
