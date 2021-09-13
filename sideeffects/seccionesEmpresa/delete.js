import { all, takeLatest, put } from "redux-saga/effects";
import { Operaciones } from "../../constants";
import { newLogSeccionEmpresa } from "../../store/logsSeccionesEmpresa";
import {
  deleteSeccionEmpresa,
  deleteSeccionEmpresaSuccess,
  deleteSeccionEmpresaError,
  getSeccionesEmpresa,
} from "../../store/seccionesEmpresa";

function* deleteSeccion({ payload }) {
  const { idSeccionEmpresa, DB, user } = payload;
  const url = `http://localhost:3000/api/secciones-empresa/delete-secciones-empresa`;
  let res = yield fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idSeccionEmpresa,
      db: DB,
    }),
  });

  const data = yield res.json();
  if (data.errorMessage) {
    yield put(deleteSeccionEmpresaError(data.errorMessage));
  } else {
    yield put(deleteSeccionEmpresaSuccess("Sección de empresa eliminada correctamente."));
    yield put(newLogSeccionEmpresa({
      idUsuario: user.idUsuario,
      Operacion: Operaciones.Delete,
      Descripcion: `Se eliminó la sección de empresa ${idSeccionEmpresa}`,
      DB,
    }));
    yield put(getSeccionesEmpresa(DB));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(deleteSeccionEmpresa.type, deleteSeccion)
  ]);
};

export default rootSaga;