import { all, fork } from 'redux-saga/effects';

import deleteUsuario from './delete';
import getUsuarios from './get';
import getUser from './getUser';
import newUsuario from './new';

function* rootSaga() {
  yield all([
    fork(deleteUsuario),
    fork(getUsuarios),
    fork(getUser),
    fork(newUsuario),
  ]);
}

export default rootSaga;
