export const getEmpleados = async () => {
  const res = await fetch('/api/empleados/get-empleados', {
    method: 'GET',
  });
  return await res.json();
}

export const deleteEmpleado = async (idEmpleado) => {
  const res = await fetch('/api/empleados/delete-empleado', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idEmpleado,
    }),
  });
  return await res.json();
}

export const getEmpleado = async (id) => {
  const res = await fetch(`/api/empleados/get-empleado?id=${id}`, {
    method: 'GET',
  });
  return await res.json();
}

export const editarEmpleado = async ({ id, Nombre = '', Apellido = '', idSeccionEmpresa = '' }) => {
  const url = `/api/empleados/edit-empleado?id=${id}`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Nombre,
      Apellido,
      idSeccionEmpresa,
    }),
  });
  return await res.json();
}

export const nuevoEmpleado = async ({ Nombre, Apellido, idSeccionEmpresa }) => {
  const url = `/api/empleados/new-empleado`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Nombre,
      Apellido,
      idSeccionEmpresa,
    }),
  });
  return await res.json();
}