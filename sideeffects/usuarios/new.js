import { put, takeLatest, fork } from 'redux-saga/effects';
import { replace } from 'connected-next-router';
import { newUsuario, newUsuarioSuccess, newUsuarioError } from '../../store/usuarios';

function* create({ payload: { Nombre, Apellido, idSeccionEmpresa, DB, user } }) {
  try {
    const url = `http://localhost:3000/api/usuarios/new-usuario`;
    const res = yield fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Nombre,
        Apellido,
        idSeccionEmpresa,
        DB,
      }),
    });
    const data = yield res.json()
    if (data.errorMessage) {
      return yield put(newUsuarioError(data.errorMessage))
    }
    yield put(newUsuarioSuccess("Usuario creado correctamente."));
    yield put(replace('/usuarios'));
  } catch (error) {
    yield put(newUsuarioError(error.message))
  }
};

function* rootSaga() {
  yield takeLatest(newUsuario.type, create);
};

export default rootSaga;
