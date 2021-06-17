export const login = async ({ Usuario, Password }) => {
  const url = `/api/login/login`;
  let res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Usuario,
      Password,
    }),
  });
  return res;
}