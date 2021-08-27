import { all, put, takeLatest } from 'redux-saga/effects';
import {
  getSeccionesEmpresa,
  getSeccionesEmpresaSuccess,
  getSeccionesEmpresaError,
} from '../../store/seccionesEmpresa';


function* get() {
  try {
    const res = yield fetch('http://localhost:3000/api/empresas/get-secciones-empresa', {
      method: 'GET',
    });
    const data = yield res.json()
    yield put(getSeccionesEmpresaSuccess(data))
  } catch (err) {
    yield put(getSeccionesEmpresaError(err))
  }
};

function* rootSaga() {
  yield all([
    takeLatest(getSeccionesEmpresa.type, get),
  ]);
};

export default rootSaga;
