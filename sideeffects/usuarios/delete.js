import { all, takeLatest, put } from "redux-saga/effects";
import {
  deleteUsuario,
  deleteUsuarioSuccess,
  deleteUsuarioError,
  getUsuarios,
} from "../../store/usuarios";
import { newLogUsuario } from '../../store/logsUsuarios';
import { Operaciones } from "../../constants";

function* deleteUser({ payload }) {
  const { idUsuario, db, user } = payload;
  const url = `http://localhost:3000/api/usuarios/delete-usuario`;
  let res = yield fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: idUsuario,
      db,
    }),
  });

  const data = yield res.json();
  if (data.errorMessage) {
    yield put(deleteUsuarioError(data.errorMessage));
  } else {
    yield put(deleteUsuarioSuccess(data.message));
    yield put(newLogUsuario({
      idUsuario: user.idUsuario,
      Operacion: Operaciones.Delete,
      Descripcion: `Se eliminó el usuario ${idUsuario}`,
      db,
    }));
    yield put(getUsuarios(db));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(deleteUsuario.type, deleteUser)
  ]);
};

export default rootSaga;