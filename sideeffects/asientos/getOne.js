import { all, put, takeLatest } from 'redux-saga/effects';
import {
  getAsiento,
  getAsientoSuccess,
  getAsientoError,
} from '../../store/asientos';

function asientoToUiModel(data) {
  return {
    ...data,
  }
}

function* getA({ payload }) {
  const { db, Numero, Renglon } = payload;
  const res = yield fetch(`http://localhost:3000/api/asientos/get-asiento?db=${db}&Numero=${Numero}&Renglon=${Renglon}`, {
    method: 'GET',
  });
  const data = yield res.json();
  if (data.errorMessage) {
    yield put(getAsientoError(data.errorMessage));
  } else {
    yield put(getAsientoSuccess(data.length ? asientoToUiModel(data[0]) : {}));
  }
};

function* rootSaga() {
  yield all([
    takeLatest(getAsiento.type, getA),
  ]);
};

export default rootSaga;
