import { useSelector } from "react-redux";

export const useSelectCopiasSeguridad = () => {
  const { copiasSeguridad } = useSelector(state => state);
  return {
    copiasSeguridad: copiasSeguridad?.list,
    loading: copiasSeguridad?.loading,
    message: copiasSeguridad?.message,
    errorMessage: copiasSeguridad?.errorMessage,
  };
}
