import { all, put, takeLatest } from 'redux-saga/effects';
import {
  getRegistros,
  getRegistrosSuccess,
  getRegistrosError,
} from '../../store/diarioMayor';

function* getA({ payload }) {
  const res = yield fetch(`http://localhost:3000/api/diarioMayor/get-registros?db=${payload}`, {
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
    takeLatest(getRegistros.type, getA),
  ]);
};

export default rootSaga;
