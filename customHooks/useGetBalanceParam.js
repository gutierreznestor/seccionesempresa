import { useRouter } from "next/router";

const useGetBalanceParam = () => {
  const { query } = useRouter();
  const FechaDesde = query.FechaDesde ? new Date(query.FechaDesde) : '';
  const FechaHasta = query.FechaHasta ? new Date(query.FechaHasta) : '';
  return {
    FechaDesde,
    FechaHasta,
  };
};

export default useGetBalanceParam;
