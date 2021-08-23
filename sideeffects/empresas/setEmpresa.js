import { all, call, put, takeLatest, fork } from 'redux-saga/effects';
import { setEmpresa, setEmpresaSuccess, setEmpresaError } from '../../store/empresas';


function* setDB({ payload }) {
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
    return yield put(setEmpresaError(data.errorMessage))
  }
  return yield put(setEmpresaSuccess(data));
};

function* rootSaga() {
  yield takeLatest(setEmpresa.type, setDB);
};

export default rootSaga;
