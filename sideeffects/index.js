import { all, fork } from "redux-saga/effects";

import authSaga from './auth';
import empleadosSaga from './empleados';
import empresaSaga from './empresas';
import logsEmpleadosSaga from './logsEmpleados';
import seccionesEmpresaSaga from './seccionesEmpresa';

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(empleadosSaga),
    fork(empresaSaga),
    fork(logsEmpleadosSaga),
    fork(seccionesEmpresaSaga),
  ]);
}

export default rootSaga;
