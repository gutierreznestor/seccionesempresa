import fetch from 'isomorphic-unfetch';

export const getLogsUsuarios = async () => {
  const res = await fetch('http://localhost:3000/api/logsUsuarios/get-logs-usuarios', {
    method: 'GET',
  });
  return await res.json();
}

export const addLogUsuario = async ({ idUsuario, Operacion, Descripcion }) => {
  const res = await fetch('http://localhost:3000/api/logsUsuarios/add-log-usuario', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idUsuario,
      Operacion,
      Descripcion,
    }),
  });
  return await res.json();
}

export const getLogsEmpleados = async () => {
  const res = await fetch('http://localhost:3000/api/logsEmpleados/get-logs-empleados', {
    method: 'GET',
  });
  return await res.json();
}

export const addLogEmpleado = async ({ idUsuario, Operacion, Descripcion }) => {
  const res = await fetch('http://localhost:3000/api/logsEmpleados/add-log-empleado', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idUsuario,
      Operacion,
      Descripcion,
    }),
  });
  return await res.json();
}

export const getLogsSeccionesEmpresa = async () => {
  const res = await fetch('http://localhost:3000/api/logsSeccionesEmpresa/get-logs-secciones-empresa', {
    method: 'GET',
  });
  return await res.json();
}

export const addLogSeccionEmpresa = async ({ user, Operacion, Descripcion }) => {
  const res = await fetch('http://localhost:3000/api/logsSeccionesEmpresa/add-log-seccion-empresa', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idUsuario: user,
      Operacion,
      Descripcion,
    }),
  });
  return await res.json();
}

export const getLogsPerfiles = async () => {
  const res = await fetch('http://localhost:3000/api/logsPerfiles/get-logs-perfiles', {
    method: 'GET',
  });
  return await res.json();
}

export const addLogPerfil = async ({ user, Operacion, Descripcion }) => {
  const res = await fetch('http://localhost:3000/api/logsPerfiles/add-log-perfil', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idUsuario: user,
      Operacion,
      Descripcion,
    }),
  });
  return await res.json();
}
