import { useSelector } from "react-redux";

export const useSelectDiarioMayor = () => {
  const { diarioMayor } = useSelector(state => state);
  return {
    diarioMayorList: diarioMayor?.list,
    diferencia: diarioMayor?.diferencia,
    errorMessage: diarioMayor?.errorMessage,
    loading: diarioMayor?.loading,
    message: diarioMayor?.message,
  };
}

export const getAsientos = state => state.asientos;