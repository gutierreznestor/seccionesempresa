import { put, takeLatest } from 'redux-saga/effects';
import { setDB, setDBSuccess, setDBError } from '../../store/empresas';

function* setDatabase({ payload }) {
  const url = `http://localhost:3000/api/login/set-db`;
  const res = yield fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      db: payload,
    }),
  });
  let data = yield res.json()
  if (data.errorMessage) {
    return yield put(setDBError(data.errorMessage))
  }
  yield put(setDBSuccess(payload));
};

function* rootSaga() {
  yield takeLatest(setDB.type, setDatabase);
};

export default rootSaga;
