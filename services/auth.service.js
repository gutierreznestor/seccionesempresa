import fetch from 'isomorphic-unfetch';

export const login = async ({ Usuario, Password, db }) => {
  const url = `http://localhost:3000/api/login/login`;
  let res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Usuario,
      Password,
      db,
    }),
  });
  return await res.json();
}

export const logout = async () => {
  return await fetch('http://localhost:3000/api/logout/logout', {
    method: 'GET',
  });
}

export const setEmpresa = async (db) => {
  return await fetch('http://localhost:3000/api/login/set-db', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      db,
    }),
  });
}