import { all, fork } from "redux-saga/effects";

import authSaga from './auth';
import contabilidadSaga from './contabilidad';
import asientoSaga from './asientos';
import balanceSaga from './balance';
import copiasSeguridadSaga from './copiasSeguridad';
import diarioMayorSaga from './diarioMayor';
import empleadosSaga from './empleados';
import empresaSaga from './empresas';
import libroDiarioSaga from './libroDiario';
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
    fork(balanceSaga),
    fork(copiasSeguridadSaga),
    fork(diarioMayorSaga),
    fork(empleadosSaga),
    fork(empresaSaga),
    fork(libroDiarioSaga),
    fork(logsEmpleadosSaga),
    fork(logsSeccionesEmpresaSaga),
    fork(logsUsuariosSaga),
    fork(planCuentasSaga),
    fork(seccionesEmpresaSaga),
    fork(usuariosSaga),
  ]);
}

export default rootSaga;
