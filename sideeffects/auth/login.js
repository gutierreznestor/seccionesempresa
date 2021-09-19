import { replace } from "connected-next-router";
import { all, takeLatest, put } from "redux-saga/effects";
import { login, loginSuccess, loginError } from "../../store/auth";
import { setDB } from "../../store/empresas";

function* loginUser({ payload }) {
  const { Usuario, Password, DB } = payload;
  const url = `http://localhost:3000/api/login/login`;
  let res = yield fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Usuario,
      Password,
      db: DB,
    }),
  });

  const data = yield res.json();
  if (data.errorMessage) {
    yield put(loginError(data.errorMessage));
  } else {
    yield put(loginSuccess(data.message));
    yield put(setDB(DB));
    yield put(replace('secciones-empresa'));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(login.type, loginUser)
  ]);
};

export default rootSaga;