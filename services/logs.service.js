export const getLogsUsuarios = async () => {
  const res = await fetch('/api/logsUsuarios/get-logs-usuarios', {
    method: 'GET',
  });
  return await res.json();
}