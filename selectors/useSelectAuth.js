import { useSelector } from "react-redux";

export const useSelectAuth = () => {
  const { auth } = useSelector(state => state);

  return {
    user: auth?.user,
    isAuthenticated: auth?.isAuthenticated,
    loading: auth?.loading,
    message: auth?.message,
    errorMessage: auth?.errorMessage,
  }
}
