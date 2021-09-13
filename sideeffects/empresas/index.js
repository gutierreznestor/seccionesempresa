import { all, fork } from 'redux-saga/effects';

import getEmpresas from './get';
import newEmpresa from './new';
import setEmpresa from './setEmpresa';

function* rootSaga() {
  yield all([
    fork(getEmpresas),
    fork(newEmpresa),
    fork(setEmpresa),
  ]);
}

export default rootSaga;
