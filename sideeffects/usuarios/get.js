import { all, put, takeLatest } from 'redux-saga/effects';
import {
  getUsuarios,
  getUsuariosSuccess,
  getUsuariosError,
} from '../../store/usuarios';


function* getUsers({ payload }) {
  const res = yield fetch(`http://localhost:3000/api/usuarios/get-usuarios?db=${payload}`, {
    method: 'GET',
  });
  const data = yield res.json();
  if (data.errorMessage) {
    yield put(getUsuariosError(data.errorMessage));
  } else {
    yield put(getUsuariosSuccess(data))
  }
};

function* rootSaga() {
  yield all([
    takeLatest(getUsuarios.type, getUsers),
  ]);
};

export default rootSaga;
