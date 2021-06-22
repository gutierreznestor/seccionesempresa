import cookie from 'cookie';

export default parseCookies = (req) => {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}
