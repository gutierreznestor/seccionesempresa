import { all, put, takeLatest } from 'redux-saga/effects';
import { getEmpresas, getEmpresasSuccess, getEmpresasError } from '../../store/empresas';


function* get() {
  try {
    const res = yield fetch('http://localhost:3000/api/empresas/get-empresas', {
      method: 'GET',
    });
    const data = yield res.json();
    if (data.errorMessage) {
      return yield put(getEmpresasError(data.errorMessage));
    }
    yield put(getEmpresasSuccess(data))
  } catch (err) {
    yield put(getEmpresasError(err))
  }
};

function* rootSaga() {
  yield all([
    takeLatest(getEmpresas.type, get),
  ]);
};

export default rootSaga;
