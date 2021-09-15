import { useSelector } from "react-redux";

export const useSelectCopiasSeguridad = () => {
  const { copiasSeguridad } = useSelector(state => state);
  return {
    copiasSeguridad: copiasSeguridad?.list,
    errorMessage: copiasSeguridad?.errorMessage,
    fileName: copiasSeguridad?.fileName,
    loading: copiasSeguridad?.loading,
    message: copiasSeguridad?.message,
    restoreMessage: copiasSeguridad?.restoreMessage,
  };
}
