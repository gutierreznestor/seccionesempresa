import { all, put, takeLatest } from 'redux-saga/effects';
import {
  getUsuario,
  getUsuarioSuccess,
  getUsuarioError,
} from '../../store/usuarios';


function* getUser({ payload: { id, db } }) {
  const res = yield fetch(`http://localhost:3000/api/usuarios/get-usuario?db=${db}&id=${id}`, {
    method: 'GET',
  });
  const data = yield res.json();
  if (data.errorMessage) {
    yield put(getUsuarioError(data.errorMessage));
  } else {
    if (data.length) {
      yield put(getUsuarioSuccess(data[0]));
    } else {
      yield put(getUsuarioError('No se encontró el usuario'));
    }
  }
};

function* rootSaga() {
  yield all([
    takeLatest(getUsuario.type, getUser),
  ]);
};

export default rootSaga;
