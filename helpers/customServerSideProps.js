import { verify } from "jsonwebtoken";
import parseCookies from "./parseCookies";
import { redirectToLogin } from "./redirectToLogin";

const customServerSideHoc = async (ctx) => {
  const cookie = parseCookies(ctx.req);
  if (!cookie.auth || !cookie.db) {
    return redirectToLogin();
  }
  const { user } = await verify(cookie.auth, 'secret');
  return {
    props: { user, db: cookie?.db },
  }
}

export default customServerSideHoc;
