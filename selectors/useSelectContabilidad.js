import { useSelector } from "react-redux";

export const useSelectContabilidad = () => {
  const { contabilidad } = useSelector(state => state);
  return {
    currentContabilidad: contabilidad?.currentContabilidad,
    loading: contabilidad?.loading,
    message: contabilidad?.message,
    errorMessage: contabilidad?.errorMessage,
  };
}
