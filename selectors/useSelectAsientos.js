import { useSelector } from "react-redux";

export const useSelectAsientos = () => {
  const { asientos } = useSelector(state => state);
  return {
    asientos: asientos?.list,
    currentAsiento: asientos?.currentAsiento,
    errorMessage: asientos?.errorMessage,
    loading: asientos?.loading,
    message: asientos?.message,
    proximoAsiento: asientos?.proximoAsiento,
  };
}
