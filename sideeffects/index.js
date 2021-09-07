import { all, fork } from "redux-saga/effects";

import authSaga from './auth';
import empleadosSaga from './empleados';
import empresaSaga from './empresas';
import logsEmpleadosSaga from './logsEmpleados';
import logsSeccionesEmpresaSaga from './logsSeccionesEmpresa';
import seccionesEmpresaSaga from './seccionesEmpresa';
import usuariosSaga from './usuarios';

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(empleadosSaga),
    fork(empresaSaga),
    fork(logsEmpleadosSaga),
    fork(logsSeccionesEmpresaSaga),
    fork(seccionesEmpresaSaga),
    fork(usuariosSaga),
  ]);
}

export default rootSaga;
