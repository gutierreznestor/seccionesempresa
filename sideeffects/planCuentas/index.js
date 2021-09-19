import { all, fork } from 'redux-saga/effects';

import getPlanesCuentas from './get';
import getPlanCuenta from './getPlanCuenta';
import newPlanCuenta from './new';

function* rootSaga() {
  yield all([
    fork(getPlanesCuentas),
    fork(getPlanCuenta),
    fork(newPlanCuenta),
  ]);
}

export default rootSaga;
