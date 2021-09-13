import { all, fork } from 'redux-saga/effects';

import login from './login';
import logout from './logout';

function* rootSaga() {
  yield all([
    fork(login),
    fork(logout),
  ]);
}

export default rootSaga;
