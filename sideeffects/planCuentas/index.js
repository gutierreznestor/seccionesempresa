import { all, fork } from 'redux-saga/effects';

import editPlanCuenta from './edit';
import getPlanesCuentas from './get';
import getPlanCuenta from './getPlanCuenta';
import newPlanCuenta from './new';

function* rootSaga() {
  yield all([
    fork(editPlanCuenta),
    fork(getPlanesCuentas),
    fork(getPlanCuenta),
    fork(newPlanCuenta),
  ]);
}

export default rootSaga;
