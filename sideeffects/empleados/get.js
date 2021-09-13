import { all, put, takeLatest } from 'redux-saga/effects';
import {
  getEmpleados,
  getEmpleadosSuccess,
  getEmpleadosError,
} from '../../store/empleados';


function* getEmp({ payload }) {
  const res = yield fetch(`http://localhost:3000/api/empleados/get-empleados?db=${payload}`, {
    method: 'GET',
  });
  const data = yield res.json();
  if (data.errorMessage) {
    yield put(getEmpleadosError(data.errorMessage));
  } else {
    yield put(getEmpleadosSuccess(data))
  }
};

function* rootSaga() {
  yield all([
    takeLatest(getEmpleados.type, getEmp),
  ]);
};

export default rootSaga;
