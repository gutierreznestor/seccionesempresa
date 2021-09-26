import { useRouter } from "next/router"

const useGetAsientoParam = () => {
  const { query } = useRouter();
  const Numero = query.Numero;
  const Renglon = query.Renglon;
  return { Numero, Renglon };
};

export default useGetAsientoParam;
