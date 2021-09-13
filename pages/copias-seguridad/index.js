import React from 'react';

import Layout from '../../components/Layout';
import Button from '../../components/Button/Button.component';
import { makeCopiaSeguridad, restaurarCopiaSeguridad } from '../../services/copiasSeguridad.service';
import BackupList from '../../components/BackupList/BackupList.component';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.component';
import customServerSideHoc from '../../helpers/customServerSideProps';
import useCopiasSeguridad from '../../customHooks/useCopiasSeguridad';

const Message = ({ message, fileName }) => {
  return (
    <div style={{ margin: '20px 0' }}>
      <strong>{message}</strong>
      <div>Nombre de la copia: {fileName}</div>
    </div>
  );
};

const CopiasSeguridad = ({ user, db }) => {

  const {
    data: { copiasSeguridad, errorMessage },
    handlers: { fetchCopiasSeguridad },
  } = useCopiasSeguridad({ db });

  const [message, setMessage] = React.useState('');
  const [fileName, setFileName] = React.useState('');

  const backup = async () => {
    setMessage('');
    setFileName('');
    const res = await makeCopiaSeguridad({ db });
    if (res.errorMessage) {
      return setErrorMessage(res.errorMessage);
    }
    setMessage(res.message);
    setFileName(res.fileName);
    fetchCopiasSeguridad()
  }

  React.useEffect(() => {
    fetchCopiasSeguridad();
  }, [db]);

  const onRestoreBackup = async (value) => {
    setMessage('');
    setFileName('');
    const res = await restaurarCopiaSeguridad({ db, fileName: value });
    if (res.errorMessage) {
      return setErrorMessage(res.errorMessage);
    }
    setMessage(res.message);
    setFileName(res.fileName);
  }

  return (
    <Layout title="Copias de seguridad" user={user}>
      <h2>{db}</h2>
      {message && <Message message={message} fileName={fileName} />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Button label="Realizar backup" onClick={backup} />
      {copiasSeguridad.length && <BackupList list={copiasSeguridad} user={user} onRestoreBackup={onRestoreBackup} />}
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  return await customServerSideHoc(ctx);
}

export default CopiasSeguridad;
