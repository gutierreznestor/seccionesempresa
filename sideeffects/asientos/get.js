import { all, put, takeLatest } from 'redux-saga/effects';
import {
  getAsientos,
  getAsientosSuccess,
  getAsientosError,
} from '../../store/asientos';

function* getA({ payload }) {
  const res = yield fetch(`http://localhost:3000/api/asientos/get-asientos?db=${payload}`, {
    method: 'GET',
  });
  const data = yield res.json();
  if (data.errorMessage) {
    yield put(getAsientosError(data.errorMessage));
  } else {
    yield put(getAsientosSuccess(data))
  }
};

function* rootSaga() {
  yield all([
    takeLatest(getAsientos.type, getA),
  ]);
};

export default rootSaga;
