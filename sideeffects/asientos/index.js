import { all, fork } from 'redux-saga/effects';

import deleteAsiento from './delete';
import getAsientos from './get';
import newAsiento from './new';

function* rootSaga() {
  yield all([
    fork(deleteAsiento),
    fork(getAsientos),
    fork(newAsiento),
  ]);
}

export default rootSaga;
