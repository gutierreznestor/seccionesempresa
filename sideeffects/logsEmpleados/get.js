import { all, put, takeLatest } from 'redux-saga/effects';
import {
  getLogsEmpleados,
  getLogsEmpleadosSuccess,
  getLogsEmpleadosError,
} from '../../store/logsEmpleados';


function* getLogs({ payload }) {
  const res = yield fetch(`http://localhost:3000/api/logsEmpleados/get-logs-empleados?db=${payload}`, {
    method: 'GET',
  });
  const data = yield res.json();
  if (data.errorMessage) {
    yield put(getLogsEmpleadosError(data.errorMessage));
  } else {
    yield put(getLogsEmpleadosSuccess(data))
  }
};

function* rootSaga() {
  yield all([
    takeLatest(getLogsEmpleados.type, getLogs),
  ]);
};

export default rootSaga;
