import { useSelector } from "react-redux";

export const useSelectEmpresas = () => {
  const { empresas } = useSelector(state => state);
  return {
    empresas: empresas?.list,
    loading: empresas?.loading,
  };
}
