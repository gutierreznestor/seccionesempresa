import { all, put, takeLatest } from 'redux-saga/effects';
import {
  getPlanCuenta,
  getPlanCuentaSuccess,
  getPlanCuentaError,
} from '../../store/planCuentas';


function* getPlan({ payload: { id, db } }) {
  const url = `http://localhost:3000/api/plan-cuentas/get-plan-cuenta?db=${db}&id=${id === undefined ? '' : id}`;
  const res = yield fetch(url, {
    method: 'GET',
  });
  const data = yield res.json();
  if (data.errorMessage) {
    yield put(getPlanCuentaError(data.errorMessage));
  } else {
    if (data.length) {
      yield put(getPlanCuentaSuccess(data[0]));
    } else {
      yield put(getPlanCuentaError('No se encontró el plan de cuenta'));
    }
  }
};

function* rootSaga() {
  yield all([
    takeLatest(getPlanCuenta.type, getPlan),
  ]);
};

export default rootSaga;
