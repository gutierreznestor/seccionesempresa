import { all, put, takeLatest } from 'redux-saga/effects';
import { getEmpresas, getEmpresasSuccess, getEmpresasFailure } from '../store/data/empresas';


function* loadDataSaga() {
  try {
    const res = yield fetch('http://localhost:3000/api/empresas/get-empresas', {
      method: 'GET',
    });
    const data = yield res.json()
    yield put(getEmpresasSuccess(data))
  } catch (err) {
    yield put(getEmpresasFailure(err))
  }
};

function* rootSaga() {
  yield all([
    takeLatest(getEmpresas.type, loadDataSaga),
  ]);
};

export default rootSaga;
