export const getLogsUsuarios = async () => {
  const res = await fetch('/api/logsUsuarios/get-logs-usuarios', {
    method: 'GET',
  });
  return await res.json();
}

export const addLogUsuario = async ({ idUsuario, Operacion, Descripcion }) => {
  const url = `/api/logsUsuarios/add-log-usuario`;
  const res = await fetch(url, {
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