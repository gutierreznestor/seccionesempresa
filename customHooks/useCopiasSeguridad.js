import { useDispatch } from 'react-redux';
import { useSelectCopiasSeguridad } from '../selectors';
import { getCopiasSeguridad, newCopiaSeguridad, restoreCopiaSeguridad } from '../store/copiasSeguridad';

const useCopiasSeguridad = ({ db }) => {
  const dispatch = useDispatch();
  const { copiasSeguridad,
    errorMessage,
    fileName,
    message,
    restoreMessage,
  } = useSelectCopiasSeguridad();

  const fetchCopiasSeguridad = () => {
    dispatch(getCopiasSeguridad(db));
  }

  const newBackup = () => {
    dispatch(newCopiaSeguridad({ db }));
  }

  const restoreBackup = ({ db, fileName }) => {
    dispatch(restoreCopiaSeguridad({ db, fileName }));
  }

  return {
    data: {
      copiasSeguridad,
      errorMessage,
      fileName,
      message,
      restoreMessage,
    },
    handlers: {
      restoreBackup,
      fetchCopiasSeguridad,
      newBackup,
    },
  }
};

export default useCopiasSeguridad;
