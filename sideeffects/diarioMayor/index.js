import { all, fork } from 'redux-saga/effects';

import getRegistros from './get';
import newRegistro from './new';

function* rootSaga() {
  yield all([
    fork(getRegistros),
    fork(newRegistro),
  ]);
}

export default rootSaga;
