import { all, put, takeLatest } from 'redux-saga/effects';
import {
  getCopiasSeguridad,
  getCopiasSeguridadSuccess,
  getCopiasSeguridadError,
} from '../../store/copiasSeguridad';


function* getCopias({ payload }) {
  const res = yield fetch(`http://localhost:3000/api/copiasSeguridad/leer-archivos?db=${payload}`, {
    method: 'GET',
  });
  const data = yield res.json();
  if (data.errorMessage) {
    yield put(getCopiasSeguridadError(data.errorMessage));
  } else {
    yield put(getCopiasSeguridadSuccess(data))
  }
};

function* rootSaga() {
  yield all([
    takeLatest(getCopiasSeguridad.type, getCopias),
  ]);
};

export default rootSaga;
