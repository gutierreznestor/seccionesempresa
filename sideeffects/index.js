import { all, fork } from "redux-saga/effects";

import authSaga from './auth';
import contabilidadSaga from './contabilidad';
import asientoSaga from './asientos';
import copiasSeguridadSaga from './copiasSeguridad';
import diarioMayorSaga from './diarioMayor';
import empleadosSaga from './empleados';
import empresaSaga from './empresas';
import logsEmpleadosSaga from './logsEmpleados';
import logsSeccionesEmpresaSaga from './logsSeccionesEmpresa';
import logsUsuariosSaga from './logsUsuarios';
import planCuentasSaga from './planCuentas';
import seccionesEmpresaSaga from './seccionesEmpresa';
import usuariosSaga from './usuarios';

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(contabilidadSaga),
    fork(asientoSaga),
    fork(copiasSeguridadSaga),
    fork(diarioMayorSaga),
    fork(empleadosSaga),
    fork(empresaSaga),
    fork(logsEmpleadosSaga),
    fork(logsSeccionesEmpresaSaga),
    fork(logsUsuariosSaga),
    fork(planCuentasSaga),
    fork(seccionesEmpresaSaga),
    fork(usuariosSaga),
  ]);
}

export default rootSaga;
