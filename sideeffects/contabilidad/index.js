import { all, fork } from 'redux-saga/effects';

import getContabilidad from './get';

function* rootSaga() {
  yield all([
    fork(getContabilidad),
  ]);
}

export default rootSaga;
