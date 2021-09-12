import { put, takeLatest, fork } from 'redux-saga/effects';
import { replace } from 'connected-next-router';
import { newUsuario, newUsuarioSuccess, newUsuarioError } from '../../store/usuarios';
import { newLogUsuario } from '../../store/logsUsuarios';
import { Operaciones } from '../../constants';

function* create({ payload: { Nombre, Apellido, Usuario, Password, db, user } }) {
  try {
    const url = `http://localhost:3000/api/usuarios/new-usuario`;
    const res = yield fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Apellido,
        db,
        Nombre,
        Password,
        Usuario,
      }),
    });
    const data = yield res.json()
    if (data.errorMessage) {
      return yield put(newUsuarioError(data.errorMessage))
    }
    yield put(newUsuarioSuccess("Usuario creado correctamente."));
    yield put(newLogUsuario({ idUsuario: user.idUsuario, Operacion: Operaciones.Create, Descripcion: Nombre, DB: db }));
    yield put(replace('/usuarios'));
  } catch (error) {
    yield put(newUsuarioError(error.message))
  }
};

function* rootSaga() {
  yield takeLatest(newUsuario.type, create);
};

export default rootSaga;
