export const getUsuarios = async () => {
  const res = await fetch('/api/usuarios/get-usuarios', {
    method: 'GET',
  });
  return res;
}

export const deleteUsuario = async (id) => {
  const res = await fetch('/api/usuarios/delete-usuario', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
    }),
  });
  return res;
}

export const getUsuario = async (id) => {
  const res = await fetch(`/api/usuarios/get-usuario?id=${id}`, {
    method: 'GET',
  });
  return res;
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
  return res;
}

export const nuevoUsuario = async ({ Usuario, Nombre, Apellido, Password }) => {
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
  return res;
}