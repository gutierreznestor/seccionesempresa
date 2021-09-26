import { all, fork } from 'redux-saga/effects';

import deleteAsiento from './delete';
import editAsiento from './edit';
import getAsientos from './get';
import getAsiento from './getOne';
import newAsiento from './new';
import getProximoAsiento from './getProximoAsiento';

function* rootSaga() {
  yield all([
    fork(deleteAsiento),
    fork(editAsiento),
    fork(getAsiento),
    fork(getAsientos),
    fork(getProximoAsiento),
    fork(newAsiento),
  ]);
}

export default rootSaga;
