import { useSelector } from "react-redux";

export const useSelectLibroDiario = () => {
  const { libroDiario } = useSelector(state => state);
  return {
    errorMessage: libroDiario?.errorMessage,
    libroDiario: libroDiario?.libroDiario.asientos,
    loading: libroDiario?.loading,
    message: libroDiario?.message,
    TotalDebe: libroDiario?.libroDiario.TotalDebe,
    TotalHaber: libroDiario?.libroDiario.TotalHaber
  };
}
