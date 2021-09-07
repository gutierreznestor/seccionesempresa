import { all, fork } from 'redux-saga/effects';

import getLogsSeccionesEmpresa from './get';
import newLogSeccionEmpresa from './new';

function* rootSaga() {
  yield all([
    fork(getLogsSeccionesEmpresa),
    fork(newLogSeccionEmpresa),
  ]);
}

export default rootSaga;
