import { useDispatch } from 'react-redux';
import { useSelectLogsUsuarios } from '../selectors';
import { getLogsUsuarios } from '../store/logsUsuarios';

const useLogUsuarios = () => {
  const dispatch = useDispatch();
  const {
    errorMessage,
    message,
    loading,
    logsUsuarios,
  } = useSelectLogsUsuarios();

  const fetchLogsUsuarios = (DB) => {
    dispatch(getLogsUsuarios(DB));
  }

  return {
    data: {
      errorMessage,
      message,
      loading,
      logsUsuarios,
    },
    handlers: {
      fetchLogsUsuarios,
    },
  }
};

export default useLogUsuarios;
