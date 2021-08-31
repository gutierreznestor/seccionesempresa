import { all, fork } from 'redux-saga/effects';

import deleteSeccionEmpresa from './delete';
import getEmpleados from './get';
import newEmpleado from './new';

function* rootSaga() {
  yield all([
    fork(deleteSeccionEmpresa),
    fork(getEmpleados),
    fork(newEmpleado),
  ]);
}

export default rootSaga;
