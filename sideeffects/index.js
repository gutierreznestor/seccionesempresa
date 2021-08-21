import { all, fork } from "redux-saga/effects";

import empresaSaga from './empresas'

function* rootSaga() {
  yield all([
    fork(empresaSaga),
  ]);
}

export default rootSaga;
