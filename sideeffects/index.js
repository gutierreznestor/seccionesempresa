import { all, fork } from "redux-saga/effects";

import authSaga from './auth';
import empresaSaga from './empresas';

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(empresaSaga),
  ]);
}

export default rootSaga;
