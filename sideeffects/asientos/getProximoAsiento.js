import { all, put, takeLatest } from 'redux-saga/effects';
import {
  getProximoAsiento,
  getProximoAsientoSuccess,
  getProximoAsientoError,
} from '../../store/asientos';

function* getA({ payload }) {
  const { db, Numero } = payload;
  const res = yield fetch(`http://localhost:3000/api/asientos/get-proximo-asiento?db=${db}&Numero=${Numero}`, {
    method: 'GET',
  });
  const data = yield res.json();
  if (data.errorMessage) {
    yield put(getProximoAsientoError(data.errorMessage));
  } else {
    yield put(getProximoAsientoSuccess(data));
  }
};

function* rootSaga() {
  yield all([
    takeLatest(getProximoAsiento.type, getA),
  ]);
};

export default rootSaga;
