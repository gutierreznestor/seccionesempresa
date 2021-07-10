import React from 'react';
import { verify } from 'jsonwebtoken';
import parseCookies from '../../helpers/parseCookies';
import { redirectToLogin } from '../../helpers/redirectToLogin';

import Layout from '../../components/Layout';
import Button from '../../components/Button/Button.component';
import { LeerArchivos, MakeCopiaSeguridad } from '../../services/copiasSeguridad.service';
import BackupList from '../../components/BackupList/BackupList.component';

const CopiasSeguridad = ({ user, db }) => {

  const [backups, setBackups] = React.useState([]);

  const getNames = async () => {
    const res = await LeerArchivos({ db });
    setBackups(res);
  }

  const backup = async () => {
    await MakeCopiaSeguridad({ db });
    getNames()
  }

  React.useEffect(() => {
    getNames();
  }, [getNames, db]);

  return (
    <Layout title="Copias de seguridad" user={user}>
      <h1>Copias de seguridad</h1>
      <h2>{db}</h2>
      <Button label="Realizar backup" onClick={backup} />
      {backups.length && <BackupList list={backups} user={user} />}
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
