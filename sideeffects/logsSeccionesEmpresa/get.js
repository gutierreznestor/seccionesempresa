import { all, put, takeLatest } from 'redux-saga/effects';
import {
  getLogsSeccionesEmpresa,
  getLogsSeccionesEmpresaSuccess,
  getLogsSeccionesEmpresaError,
} from '../../store/logsSeccionesEmpresa';


function* getLogs({ payload }) {
  const res = yield fetch(`http://localhost:3000/api/logsSeccionesEmpresa/get-logs-secciones-empresa?db=${payload}`, {
    method: 'GET',
  });
  const data = yield res.json();
  if (data.errorMessage) {
    yield put(getLogsSeccionesEmpresaError(data.errorMessage));
  } else {
    yield put(getLogsSeccionesEmpresaSuccess(data))
  }
};

function* rootSaga() {
  yield all([
    takeLatest(getLogsSeccionesEmpresa.type, getLogs),
  ]);
};

export default rootSaga;
