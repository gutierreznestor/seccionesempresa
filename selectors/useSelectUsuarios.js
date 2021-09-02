import { useSelector } from "react-redux";

export const useSelectUsuarios = () => {
  const { usuarios } = useSelector(state => state);
  return {
    usuarios: usuarios?.list,
    loading: usuarios?.loading,
    message: usuarios?.message,
    errorMessage: usuarios?.errorMessage,
  };
}
