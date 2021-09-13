import { all, fork } from 'redux-saga/effects';

import getCopiasSeguridad from './get';
import newCopiaSeguridad from './new';

function* rootSaga() {
  yield all([
    fork(getCopiasSeguridad),
    fork(newCopiaSeguridad),
  ]);
}

export default rootSaga;
