import { put, takeLatest, fork } from 'redux-saga/effects';
import { newEmpresa, newEmpresaSuccess, newEmpresaError, getEmpresas } from '../../store/empresas';

function* crearEmpresa({ empresa, DB }) {
  const url = `http://localhost:3000/api/empresas/nueva-empresa`;
  const res = yield fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      empresa,
      DB,
    }),
  });
  const data = yield res.json()
  return data;
}

function* crearBase({ DB }) {
  const url = `http://localhost:3000/api/empresas/nueva-base`;
  const res = yield fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      DB,
    }),
  });
  const data = yield res.json()
  return data;
}

function* setDb({ DB }) {
  const url = `http://localhost:3000/api/login/set-db`;
  const res = yield fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      db: DB,
    }),
  });
  const data = yield res.json()
  if (data.errorMessage) {
    return yield put(newEmpresaError(data.errorMessage))
  }
}

function* create({ payload: { empresa, DB } }) {
  try {
    let data = yield fork(crearEmpresa, { empresa, DB });
    if (data.errorMessage) {
      return yield put(newEmpresaError(data.errorMessage))
    }
    data = yield fork(crearBase, { DB });
    if (data.errorMessage) {
      return yield put(newEmpresaError(data.errorMessage))
    }
    data = yield fork(setDb, { DB });
    if (data.errorMessage) {
      return yield put(newEmpresaError(data.errorMessage))
    }
    yield put(newEmpresaSuccess("Empresa creada correctamente."));
    yield put(getEmpresas());
  } catch (error) {
    yield put(newEmpresaError(error))
  }
};

function* rootSaga() {
  yield takeLatest(newEmpresa.type, create);
};

export default rootSaga;
