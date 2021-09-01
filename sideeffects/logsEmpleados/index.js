import { all, fork } from 'redux-saga/effects';

import getLogsEmpleados from './get';
import newLogEmpleado from './new';

function* rootSaga() {
  yield all([
    fork(getLogsEmpleados),
    fork(newLogEmpleado),
  ]);
}

export default rootSaga;
