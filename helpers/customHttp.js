import Router from 'next/router';
import fetch from 'isomorphic-unfetch';

export const customHttps = async (url, method = 'GET', ctx) => {
  const cookie = ctx.req?.headers.cookie;
  const resp = await fetch(
    {
      url,
      method,
    },
    {
      headers: {
        cookie,
      }
    });

  if (resp.status === 401 && !ctx.req) {
    Router.replace('login');
    return {};
  }

  if (resp.status === 401 && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: 'http://localhost:3000/login'
    });
    ctx.res.end();
    return;
  }
  return await res.json();
}