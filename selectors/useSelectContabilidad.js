import { useSelector } from "react-redux";

export const useSelectContabilidad = () => {
  const { contabilidad } = useSelector(state => state);
  return {
    currentContabilidad: contabilidad?.currentContabilidad,
    errorMessage: contabilidad?.errorMessage,
    loading: contabilidad?.loading,
    message: contabilidad?.message,
    proximoAsiento: contabilidad?.proximoAsiento,
  };
}

export const getContabilidad = state => state.contabilidad;
