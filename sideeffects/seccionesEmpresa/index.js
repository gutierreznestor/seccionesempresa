import { all, fork } from 'redux-saga/effects';

import getSeccionesEmpresa from './get';

function* rootSaga() {
  yield all([
    fork(getSeccionesEmpresa),
  ]);
}

export default rootSaga;
