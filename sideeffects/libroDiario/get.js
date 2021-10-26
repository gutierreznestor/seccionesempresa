import { all, put, takeLatest } from 'redux-saga/effects';
import {
  getLibroDiario,
  getLibroDiarioSuccess,
  getLibroDiarioError,
} from '../../store/libroDiario';
import { formatDate } from '../../helpers/dates';
import { newDecimal2 } from '../../helpers/decimalNumbers';

const convertLibroDiarioToUi = (data) => {
  return {
    ...data,
    asientos: data.asientos.map((asiento) => ({
      ...asiento,
      Renglones: asiento.Renglones.map((renglon) => ({
        ...renglon,
        Debe: newDecimal2(renglon.Debe),
        Haber: newDecimal2(renglon.Haber),
      })),
    })),
    TotalDebe: newDecimal2(data.TotalDebe),
    TotalHaber: newDecimal2(data.TotalHaber),
  }
}

function* getLibro({ payload: { Fecha, db } }) {
  let url = `http://localhost:3000/api/libroDiario/get-libro-diario?db=${db}`;
  if (Fecha) {
    url += `&Fecha=${formatDate({ date: Fecha, formatString: 'yyyy-MM-dd' })}`;
  }
  const res = yield fetch(url, {
    method: 'GET',
  });

  const data = yield res.json();
  if (data.errorMessage) {
    yield put(getLibroDiarioError(data.errorMessage));
  } else {
    yield put(getLibroDiarioSuccess(convertLibroDiarioToUi(data)))
  }
}

function* rootSaga() {
  yield all([
    takeLatest(getLibroDiario.type, getLibro),
  ]);
};

export default rootSaga;
