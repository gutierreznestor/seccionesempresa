import { all, put, takeLatest } from 'redux-saga/effects';
import {
  getNextPlanCuenta,
  getNextPlanCuentaSuccess,
  getNextPlanCuentaError,
} from '../../store/planCuentas';


function* getNext({ payload: { id, db } }) {
  const res = yield fetch(`http://localhost:3000/api/plan-cuentas/get-next-plan-cuenta?db=${db}&id=${id}`, {
    method: 'GET',
  });
  const data = yield res.json();
  if (data.errorMessage) {
    yield put(getNextPlanCuentaError(data.errorMessage));
  } else {
    yield put(getNextPlanCuentaSuccess(data));
  }
};

function* rootSaga() {
  yield all([
    takeLatest(getNextPlanCuenta.type, getNext),
  ]);
};

export default rootSaga;
