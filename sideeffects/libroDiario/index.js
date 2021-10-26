import { all, fork } from 'redux-saga/effects';

import getLibroDiario from './get';
import registrarLibroDiario from './registrar';

function* rootSaga() {
  yield all([
    fork(getLibroDiario),
    fork(registrarLibroDiario),
  ]);
}

export default rootSaga;
