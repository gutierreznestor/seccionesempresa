import { all, put, takeLatest } from 'redux-saga/effects';
import { newEmpresa, newEmpresaSuccess, newEmpresaError } from '../../store/empresas';


function* create({ payload }) {
  try {
    yield console.log('********** payload: ', payload);
    let url = `http://localhost:3000/api/empresas/nueva-empresa`;
    let res = yield fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        empresa: payload.empresa,
        DB: payload.DB,
      }),
    });
    const data = yield res.json()
    if (data.errorMessage) {
      yield put(newEmpresaError(data.errorMessage))
    } else {
      yield put(newEmpresaSuccess(data))
    }
  } catch (err) {
    yield put(newEmpresaError(err))
  }
};

function* rootSaga() {
  yield takeLatest(newEmpresa.type, create);
};

export default rootSaga;
