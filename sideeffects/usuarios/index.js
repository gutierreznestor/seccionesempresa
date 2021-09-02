import { all, fork } from 'redux-saga/effects';

import deleteUsuario from './delete';
import getUsuarios from './get';
import newUsuario from './new';

function* rootSaga() {
  yield all([
    fork(deleteUsuario),
    fork(getUsuarios),
    fork(newUsuario),
  ]);
}

export default rootSaga;
