import React from 'react';
import { verify } from 'jsonwebtoken';
import parseCookies from '../../helpers/parseCookies';
import { redirectToLogin } from '../../helpers/redirectToLogin';

import Layout from '../../components/Layout';
import Button from '../../components/Button/Button.component';
import { leerArchivos, makeCopiaSeguridad, restaurarCopiaSeguridad } from '../../services/copiasSeguridad.service';
import BackupList from '../../components/BackupList/BackupList.component';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.component';

const CopiasSeguridad = ({ user, db }) => {

  const [backups, setBackups] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState('');

  const getNames = async () => {
    const res = await leerArchivos({ db });
    setBackups(res);
  }

  const backup = async () => {
    const res = await makeCopiaSeguridad({ db });
    if (res.errorMessage) {
      return setErrorMessage(res.errorMessage);
    }
    getNames()
  }

  React.useEffect(() => {
    getNames();
  }, [db]);

  const onRestoreBackup = async (value) => {
    const res = await restaurarCopiaSeguridad({ db, fileName: value });
    if (res.errorMessage) {
      return setErrorMessage(res.errorMessage);
    }
    console.log({ res });
  }

  return (
    <Layout title="Copias de seguridad" user={user}>
      <h1>Copias de seguridad</h1>
      <h2>{db}</h2>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Button label="Realizar backup" onClick={backup} />
      {backups.length && <BackupList list={backups} user={user} onRestoreBackup={onRestoreBackup} />}
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
