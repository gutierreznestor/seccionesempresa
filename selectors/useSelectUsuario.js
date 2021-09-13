import { useSelector } from "react-redux";

export const useSelectUsuario = () => {
  const { usuarios } = useSelector(state => state);
  return {
    currentUsuario: usuarios?.currentUsuario,
    loading: usuarios?.loading,
    message: usuarios?.message,
    errorMessage: usuarios?.errorMessage,
  };
}
