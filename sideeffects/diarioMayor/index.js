import { all, fork } from 'redux-saga/effects';

import getRegistros from './get';
import registerAsiento from './registerAsiento';

function* rootSaga() {
  yield all([
    fork(getRegistros),
    fork(registerAsiento),
  ]);
}

export default rootSaga;
