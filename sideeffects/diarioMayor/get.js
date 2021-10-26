import { all, put, takeLatest } from 'redux-saga/effects';
import { formatDate } from '../../helpers/dates';
import { newDecimal2 } from '../../helpers/decimalNumbers';
import {
  getRegistros,
  getRegistrosSuccess,
  getRegistrosError,
} from '../../store/diarioMayor';

const convertDiarioMayorToUi = (list = []) => {
  return list.map(item => {
    return {
      ...item,
      asientos: item.asientos.map(asiento => {
        return {
          ...asiento,
          Deb: newDecimal2(asiento.Deb),
          Cred: newDecimal2(asiento.Cred),
          Saldo: newDecimal2(asiento?.Saldo),
        }
      }),
    }
  });
}

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
    yield put(getRegistrosSuccess(convertDiarioMayorToUi(data)))
  }
};

function* rootSaga() {
  yield all([
    takeLatest(getRegistros.type, getMayor),
  ]);
};

export default rootSaga;
