import { all, put, takeLatest } from 'redux-saga/effects';
import { formatDate } from '../../helpers/dates';
import {
  getBalance,
  getBalanceSuccess,
  getBalanceError,
} from '../../store/balance';

function* getB({ payload: { db, FechaDesde, FechaHasta, idPlanCuenta } }) {
  let url = `http://localhost:3000/api/balance/get-balance?db=${db}`;
  if (idPlanCuenta) {
    url += `&idPlanCuenta=${idPlanCuenta}`;
  }
  if (FechaHasta) {
    url += `&FechaHasta=${formatDate({ date: FechaHasta, formatString: 'yyyy-MM-dd' })}`;
  }
  if (FechaDesde) {
    url += `&FechaDesde=${formatDate({ date: FechaDesde, formatString: 'yyyy-MM-dd' })}`;
  }
  const res = yield fetch(url, {
    method: 'GET',
  });
  const data = yield res.json();
  if (data.errorMessage) {
    yield put(getBalanceError(data.errorMessage));
  } else {
    yield put(getBalanceSuccess(data))
  }
};

function* rootSaga() {
  yield all([
    takeLatest(getBalance.type, getB),
  ]);
};

export default rootSaga;
