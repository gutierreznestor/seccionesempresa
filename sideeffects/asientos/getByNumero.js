import { all, put, takeLatest } from 'redux-saga/effects';
import {
  getAsientoByNumero,
  getAsientoByNumeroSuccess,
  getAsientoByNumeroError,
} from '../../store/asientos';

function asientoToUiModel(data) {
  return {
    ...data,
    Fecha: new Date(data.Fecha),
    FechaOperacion: new Date(data.FechaOperacion),
    FechaVencimiento: new Date(data.FechaVencimiento),
  }
}

function* getA({ payload }) {
  const { db, Numero, Renglon } = payload;
  const res = yield fetch(`http://localhost:3000/api/asientos/get-asientos-by-numero?db=${db}&Numero=${Numero}`, {
    method: 'GET',
  });
  const data = yield res.json();
  if (data.errorMessage) {
    yield put(getAsientoByNumeroError(data.errorMessage));
  } else {
    yield put(getAsientoByNumeroSuccess(data));
  }
};

function* rootSaga() {
  yield all([
    takeLatest(getAsientoByNumero.type, getA),
  ]);
};

export default rootSaga;
