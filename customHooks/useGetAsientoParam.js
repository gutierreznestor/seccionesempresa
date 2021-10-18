import { useRouter } from "next/router";

const useGetAsientoParam = () => {
  const { query } = useRouter();
  const Fecha = query.Fecha ? new Date(query.Fecha) : '';
  const FechaOperacion = query.FechaOperacion ? new Date(query.FechaOperacion) : '';
  const FechaVencimiento = query.FechaVencimiento ? new Date(query.FechaVencimiento) : '';
  const Leyenda = query.Leyenda;
  const Numero = query.Numero;
  const Renglon = query.Renglon;
  const TipoAsiento = query.TipoAsiento;
  return {
    Fecha,
    FechaOperacion,
    FechaVencimiento,
    Leyenda,
    Numero,
    Renglon,
    TipoAsiento,
  };
};

export default useGetAsientoParam;
