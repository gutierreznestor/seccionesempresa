import { useRouter } from "next/router";

const useGetAsientoParam = () => {
  const { query } = useRouter();
  const Fecha = query.Fecha ? new Date(query.Fecha) : '';
  const Leyenda = query.Leyenda;
  const Numero = query.Numero;
  const Renglon = query.Renglon;
  const TipoAsiento = query.TipoAsiento;
  return {
    Fecha,
    Leyenda,
    Numero,
    Renglon,
    TipoAsiento,
  };
};

export default useGetAsientoParam;
