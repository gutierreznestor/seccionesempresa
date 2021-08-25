import { useDispatch } from "react-redux";
import { useSelectEmpresas } from "../selectors/useSelectEmpresas";
import { login as loginUser } from "../store/auth";

const useLogin = () => {
  const dispatch = useDispatch();
  const { DB } = useSelectEmpresas();
  const login = (payload) => {
    dispatch(loginUser({ ...payload, DB }));
  }
  return {
    login,
  }
}

export default useLogin;
