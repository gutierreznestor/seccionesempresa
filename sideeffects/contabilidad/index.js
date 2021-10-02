import { all, fork } from 'redux-saga/effects';

import editContabilidad from './edit';
import getContabilidad from './get';

function* rootSaga() {
  yield all([
    fork(editContabilidad),
    fork(getContabilidad),
  ]);
}

export default rootSaga;
