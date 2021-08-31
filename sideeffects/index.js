import { all, fork } from "redux-saga/effects";

import authSaga from './auth';
import empleadosSaga from './empleados';
import empresaSaga from './empresas';
import seccionesEmpresaSaga from './seccionesEmpresa';

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(empleadosSaga),
    fork(empresaSaga),
    fork(seccionesEmpresaSaga),
  ]);
}

export default rootSaga;
