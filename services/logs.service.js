export const getLogsUsuarios = async () => {
  const res = await fetch('/api/logsUsuarios/get-logsUsuarios', {
    method: 'GET',
  });
  return await res.json();
}