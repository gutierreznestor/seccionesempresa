import { all, fork } from 'redux-saga/effects';

import deleteSeccionEmpresa from './delete';
import getSeccionesEmpresa from './get';
import newSeccionesEmpresa from './new';

function* rootSaga() {
  yield all([
    fork(deleteSeccionEmpresa),
    fork(getSeccionesEmpresa),
    fork(newSeccionesEmpresa),
  ]);
}

export default rootSaga;
