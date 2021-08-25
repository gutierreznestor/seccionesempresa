import { takeLatest } from "redux-saga/effects";
import { login } from "../../store/auth";

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

  const data = yield res.json()
  return data;
}

function* rootSaga() {
  yield takeLatest(login.type, loginUser);
};

export default rootSaga;