import { all, fork } from 'redux-saga/effects';

import getEmpresas from './get';
import newEmpresa from './new';

function* rootSaga() {
  yield all([
    fork(getEmpresas),
    fork(newEmpresa),
  ]);
}

export default rootSaga;
