import { all, fork } from "redux-saga/effects";

import authSaga from './auth';
import empresaSaga from './empresas';
import seccionesEmpresaSaga from './seccionesEmpresa';

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(empresaSaga),
    fork(seccionesEmpresaSaga),
  ]);
}

export default rootSaga;
