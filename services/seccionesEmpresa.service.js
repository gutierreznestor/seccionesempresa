export const getSeccionesEmpresa = async () => {
  const res = await fetch('/api/seccionesEmpresa/get-secciones-empresa', {
    method: 'GET',
  });
  return res;
}

export const deleteSeccionesEmpresa = async (idSeccionEmpresa) => {
  const res = await fetch('/api/seccionesEmpresa/delete-secciones-empresa', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idSeccionEmpresa,
    }),
  });
  return res;
}