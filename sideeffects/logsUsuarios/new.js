import { put, takeLatest } from 'redux-saga/effects';
import { newLogUsuario, newLogUsuarioSuccess, newLogUsuarioError } from '../../store/logsUsuarios';

function* create({ payload: { idUsuario, Operacion, Descripcion, DB } }) {
  try {
    const url = `http://localhost:3000/api/logsUsuarios/add-log-usuario`;
    const res = yield fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idUsuario,
        Operacion,
        Descripcion,
        DB,
      }),
    });
    const data = yield res.json()
    if (data.errorMessage) {
      return yield put(newLogUsuarioError(data.errorMessage))
    }
    yield put(newLogUsuarioSuccess("Log de usuario creado correctamente."));
  } catch (error) {
    yield put(newLogUsuarioError(error))
  }
};

function* rootSaga() {
  yield takeLatest(newLogUsuario.type, create);
};

export default rootSaga;
