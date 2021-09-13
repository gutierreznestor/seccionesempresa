import { useDispatch } from "react-redux";
import { logout as onLogout } from "../store/auth";

const useLogout = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(onLogout());
  }
  return {
    logout,
  }
}

export default useLogout;
