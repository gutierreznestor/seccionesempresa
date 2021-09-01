import { all, fork } from 'redux-saga/effects';

import deleteEmpleado from './delete';
import getEmpleados from './get';
import newEmpleado from './new';

function* rootSaga() {
  yield all([
    fork(deleteEmpleado),
    fork(getEmpleados),
    fork(newEmpleado),
  ]);
}

export default rootSaga;
