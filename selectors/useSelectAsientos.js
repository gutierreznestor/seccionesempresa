import { useSelector } from "react-redux";

export const useSelectAsientos = () => {
  const { asientos } = useSelector(state => state);
  return {
    asientos: asientos?.list,
    loading: asientos?.loading,
    message: asientos?.message,
    errorMessage: asientos?.errorMessage,
  };
}
