import { all, fork } from 'redux-saga/effects';

import get from './get';

function* rootSaga() {
  yield all([
    fork(get),
  ]);
}

export default rootSaga;
