import { all, fork } from 'redux-saga/effects';

import getRegistros from './get';

function* rootSaga() {
  yield all([
    fork(getRegistros),
  ]);
}

export default rootSaga;
