import { all, fork } from 'redux-saga/effects';

import deletePlanCuenta from './delete';
import editPlanCuenta from './edit';
import getPlanesCuentas from './get';
import getPlanCuenta from './getPlanCuenta';
import newPlanCuenta from './new';

function* rootSaga() {
  yield all([
    fork(deletePlanCuenta),
    fork(editPlanCuenta),
    fork(getPlanesCuentas),
    fork(getPlanCuenta),
    fork(newPlanCuenta),
  ]);
}

export default rootSaga;
