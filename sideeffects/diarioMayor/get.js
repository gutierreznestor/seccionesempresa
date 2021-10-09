import { all, put, takeLatest } from 'redux-saga/effects';
import { formatDate } from '../../helpers/dates';
import {
  getRegistros,
  getRegistrosSuccess,
  getRegistrosError,
} from '../../store/diarioMayor';

function* getMayor({ payload: { db, FechaDesde, FechaHasta, idPlanCuenta } }) {
  let url = `http://localhost:3000/api/diarioMayor/get-mayor-cuentas?db=${db}&idPlanCuenta=${idPlanCuenta}`;
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
