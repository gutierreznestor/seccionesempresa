export const getPerfiles = async () => {
  const res = await fetch('/api/perfiles/get-perfiles', {
    method: 'GET',
  });
  return await res.json();
}

export const deletePerfiles = async (id) => {
  const res = await fetch('/api/perfiles/delete-perfil', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
    }),
  });
  return await res.json();
}

export const getPerfil = async (id) => {
  const res = await fetch(`/api/perfiles/get-perfil?id=${id}`, {
    method: 'GET',
  });
  return await res.json();
}

export const editarPerfil = async ({ id, Nombre = '' }) => {
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
  return await res.json();
}

export const nuevoPerfil = async ({ Nombre = '' }) => {
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
  return await res.json();
}