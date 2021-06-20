export const getLogsUsuarios = async () => {
  const res = await fetch('/api/logsUsuarios/get-logs-usuarios', {
    method: 'GET',
  });
  return await res.json();
}

export const addLogUsuario = async ({ idUsuario, Operacion, Descripcion }) => {
  const res = await fetch('/api/logsUsuarios/add-log-usuario', {
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
  const res = await fetch('/api/logsEmpleados/get-logs-empleados', {
    method: 'GET',
  });
  return await res.json();
}

export const addLogEmpleado = async ({ idUsuario, Operacion, Descripcion }) => {
  const res = await fetch('/api/logsEmpleados/add-log-empleado', {
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
  const res = await fetch('/api/logsSeccionesEmpresa/get-logs-secciones-empresa', {
    method: 'GET',
  });
  return await res.json();
}

export const addLogSeccionEmpresa = async ({ user, Operacion, Descripcion }) => {
  const res = await fetch('/api/logsSeccionesEmpresa/add-log-seccion-empresa', {
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
