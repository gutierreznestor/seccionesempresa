import { all, put, takeLatest } from 'redux-saga/effects';
import {
  getContabilidad,
  getContabilidadSuccess,
  getContabilidadError,
} from '../../store/contabilidad';


function* getCont({ payload }) {
  const res = yield fetch(`http://localhost:3000/api/contabilidad/get-contabilidad?db=${payload}`, {
    method: 'GET',
  });
  const data = yield res.json();
  if (data.errorMessage) {
    yield put(getContabilidadError(data.errorMessage));
  } else {
    yield put(getContabilidadSuccess(data))
  }
};

function* rootSaga() {
  yield all([
    takeLatest(getContabilidad.type, getCont),
  ]);
};

export default rootSaga;
