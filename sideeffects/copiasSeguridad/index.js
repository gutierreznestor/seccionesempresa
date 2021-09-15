import { all, fork } from 'redux-saga/effects';

import getCopiasSeguridad from './get';
import newCopiaSeguridad from './new';
import restoreCopiaSeguridad from './restore';

function* rootSaga() {
  yield all([
    fork(getCopiasSeguridad),
    fork(newCopiaSeguridad),
    fork(restoreCopiaSeguridad),
  ]);
}

export default rootSaga;
