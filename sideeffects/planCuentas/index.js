import { all, fork } from 'redux-saga/effects';

import getPlanesCuentas from './get';

function* rootSaga() {
  yield all([
    fork(getPlanesCuentas),
  ]);
}

export default rootSaga;
