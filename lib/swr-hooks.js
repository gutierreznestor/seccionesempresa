import useSWR from 'swr';

function fetcher(url) {
  return window.fetch(url).then((res) => res.json())
}

export function useSeccionesEmpresa() {
  const { data, error } = useSWR(`/api/get-secciones-empresa`, fetcher)
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useEntry(id) {
  return useSWR(`/api/get-entry?id=${id}`, fetcher)
}
