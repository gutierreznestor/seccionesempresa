import { useRouter } from "next/router"

const useGetCuentaParam = () => {
  const { query } = useRouter();
  const CodigoPlan = query.CodigoPlan;
  return { CodigoPlan };
};

export default useGetCuentaParam;
