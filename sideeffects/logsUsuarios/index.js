import { all, fork } from 'redux-saga/effects';

import getLogsUsuarios from './get';
import newLogUsuario from './new';

function* rootSaga() {
  yield all([
    fork(getLogsUsuarios),
    fork(newLogUsuario),
  ]);
}

export default rootSaga;
