import { all, fork } from 'redux-saga/effects';

import deleteSeccionEmpresa from './delete';
import getSeccionesEmpresa from './get';

function* rootSaga() {
  yield all([
    fork(deleteSeccionEmpresa),
    fork(getSeccionesEmpresa),
  ]);
}

export default rootSaga;
