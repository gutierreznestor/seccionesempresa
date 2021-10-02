import { useSelector } from "react-redux";

export const useSelectAsientos = () => {
  const { asientos } = useSelector(state => state);
  return {
    asientos: asientos?.list,
    asientosNumero: asientos?.asientosNumero,
    currentAsiento: asientos?.currentAsiento,
    diferencia: asientos?.diferencia,
    errorMessage: asientos?.errorMessage,
    loading: asientos?.loading,
    message: asientos?.message,
    proximoAsiento: asientos?.proximoAsiento,
  };
}

export const getAsientos = state => state.asientos;