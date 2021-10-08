import { all, put, takeLatest } from 'redux-saga/effects';
import {
  getRegistros,
  getRegistrosSuccess,
  getRegistrosError,
} from '../../store/diarioMayor';

function* getMayor({ payload: { db, FechaHasta, idPlanCuenta } }) {
  let url = `http://localhost:3000/api/diarioMayor/get-mayor-cuentas?db=${db}&idPlanCuenta=${idPlanCuenta}`;
  if (FechaHasta) {
    url += `&FechaHasta=${FechaHasta}`;
  }
  const res = yield fetch(url, {
    method: 'GET',
  });
  const data = yield res.json();
  if (data.errorMessage) {
    yield put(getRegistrosError(data.errorMessage));
  } else {
    yield put(getRegistrosSuccess(data))
  }
};

function* rootSaga() {
  yield all([
    takeLatest(getRegistros.type, getMayor),
  ]);
};

export default rootSaga;
