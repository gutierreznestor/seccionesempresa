import { all, put, takeLatest } from 'redux-saga/effects';
import {
  getPlanesCuentas,
  getPlanesCuentasSuccess,
  getPlanesCuentasError,
} from '../../store/planCuentas';


function* getPlanes({ payload }) {
  const res = yield fetch(`http://localhost:3000/api/plan-cuentas/get-plan-cuentas?db=${payload}`, {
    method: 'GET',
  });
  const data = yield res.json();
  if (data.errorMessage) {
    yield put(getPlanesCuentasError(data.errorMessage));
  } else {
    yield put(getPlanesCuentasSuccess(data))
  }
};

function* rootSaga() {
  yield all([
    takeLatest(getPlanesCuentas.type, getPlanes),
  ]);
};

export default rootSaga;
