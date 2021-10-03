import { useSelector } from "react-redux";

export const useSelectLibroDiario = () => {
  const { libroDiario } = useSelector(state => state);
  return {
    libroDiario: libroDiario?.libroDiario,
    errorMessage: libroDiario?.errorMessage,
    loading: libroDiario?.loading,
    message: libroDiario?.message,
  };
}
