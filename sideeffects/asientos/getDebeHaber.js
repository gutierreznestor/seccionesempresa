import { all, put, takeLatest } from 'redux-saga/effects';
import {
  getDebeHaber,
  getDebeHaberSuccess,
  getDebeHaberError,
} from '../../store/asientos';

function* getDH({ payload }) {
  const { db, Numero } = payload;
  const res = yield fetch(`http://localhost:3000/api/asientos/get-debe-haber?db=${db}&Numero=${Numero}`, {
    method: 'GET',
  });
  const data = yield res.json();
  if (data.errorMessage) {
    yield put(getDebeHaberError(data.errorMessage));
  } else {
    if (data.length) {
      const Debe = data[0].Debe;
      const Haber = data[0].Haber;
      const Diferencia = Debe - Haber;
      yield put(getDebeHaberSuccess({ Numero, Debe, Haber, Diferencia }));
    }
  }
};

function* rootSaga() {
  yield all([
    takeLatest(getDebeHaber.type, getDH),
  ]);
};

export default rootSaga;
