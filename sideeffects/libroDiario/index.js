import { all, fork } from 'redux-saga/effects';

import getLibroDiario from './get';

function* rootSaga() {
  yield all([
    fork(getLibroDiario),
  ]);
}

export default rootSaga;
