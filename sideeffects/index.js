import { all, fork } from "redux-saga/effects";

import authSaga from './auth';
import empresaSaga from './empresas';

function* rootSaga() {
  yield all([
    fork(empresaSaga),
    fork(authSaga),
  ]);
}

export default rootSaga;
