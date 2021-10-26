import { useSelector } from "react-redux";

export const useSelectBalance = () => {
  const { balance } = useSelector(state => state);
  return {
    balanceList: balance?.list,
    errorMessage: balance?.errorMessage,
    loading: balance?.loading,
    message: balance?.message,
  };
}

export const getAsientos = state => state.asientos;