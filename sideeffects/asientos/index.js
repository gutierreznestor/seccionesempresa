import { all, fork } from 'redux-saga/effects';

import deleteAsiento from './delete';
import editAsiento from './edit';
import getAsientos from './get';
import getAsiento from './getOne';
import newAsiento from './new';

function* rootSaga() {
  yield all([
    fork(deleteAsiento),
    fork(editAsiento),
    fork(getAsientos),
    fork(getAsiento),
    fork(newAsiento),
  ]);
}

export default rootSaga;
