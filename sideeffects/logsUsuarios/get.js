import { all, put, takeLatest } from 'redux-saga/effects';
import {
  getLogsUsuarios,
  getLogsUsuariosSuccess,
  getLogsUsuariosError,
} from '../../store/logsUsuarios';


function* getLogs({ payload }) {
  const res = yield fetch(`http://localhost:3000/api/logsUsuarios/get-logs-usuarios?db=${payload}`, {
    method: 'GET',
  });
  const data = yield res.json();
  if (data.errorMessage) {
    yield put(getLogsUsuariosError(data.errorMessage));
  } else {
    yield put(getLogsUsuariosSuccess(data))
  }
};

function* rootSaga() {
  yield all([
    takeLatest(getLogsUsuarios.type, getLogs),
  ]);
};

export default rootSaga;
