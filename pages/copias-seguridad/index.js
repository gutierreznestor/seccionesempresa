import React from 'react';
import { verify } from 'jsonwebtoken';
import parseCookies from '../../helpers/parseCookies';
import { redirectToLogin } from '../../helpers/redirectToLogin';

import Layout from '../../components/Layout';
import Button from '../../components/Button/Button.component';
import { MakeCopiaSeguridad } from '../../services/copiasSeguridad.service';

const CopiasSeguridad = ({ user, db }) => {

  const backup = async () => {
    const res = await MakeCopiaSeguridad({ db });
  }

  return (
    <Layout title="Copias de seguridad" user={user}>
      <h1>Copias de seguridad</h1>
      <Button label="Realizar backup" onClick={backup} />
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx.req);
  if (!cookie.auth) {
    redirectToLogin(ctx.res);
  }
  let user = null;
  verify(cookie.auth, 'secret', async (err, decoded) => {
    if (!err && decoded) {
      user = decoded.user;
    }
  });
  return {
    props: { user, db: cookie.db },
  }
}

export default CopiasSeguridad;
