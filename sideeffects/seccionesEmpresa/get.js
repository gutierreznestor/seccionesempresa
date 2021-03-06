import { all, put, takeLatest } from 'redux-saga/effects';
import {
  getSeccionesEmpresa,
  getSeccionesEmpresaSuccess,
  getSeccionesEmpresaError,
} from '../../store/seccionesEmpresa';


function* getSecciones({ payload }) {
  const res = yield fetch(`http://localhost:3000/api/secciones-empresa/get-secciones-empresa?db=${payload}`, {
    method: 'GET',
  });
  const data = yield res.json();
  if (data.errorMessage) {
    yield put(getSeccionesEmpresaError(data.errorMessage));
  } else {
    yield put(getSeccionesEmpresaSuccess(data))
  }
};

function* rootSaga() {
  yield all([
    takeLatest(getSeccionesEmpresa.type, getSecciones),
  ]);
};

export default rootSaga;
