import React from 'react';

import Layout from '../../components/Layout';
import Button from '../../components/Button/Button.component';
import { restaurarCopiaSeguridad } from '../../services/copiasSeguridad.service';
import BackupList from '../../components/BackupList/BackupList.component';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.component';
import customServerSideHoc from '../../helpers/customServerSideProps';
import useCopiasSeguridad from '../../customHooks/useCopiasSeguridad';

const Message = ({ message, fileName }) => {
  return (
    <div style={{ margin: '20px 0', color: '#006400' }}>
      <strong>{message}</strong>
      <div>Nombre de la copia: {fileName}</div>
    </div>
  );
};

const CopiasSeguridad = ({ user, db }) => {

  const {
    data: { copiasSeguridad, errorMessage, fileName, restoreMessage },
    handlers: { fetchCopiasSeguridad, newBackup, restoreBackup },
  } = useCopiasSeguridad({ db });

  const backup = () => {
    newBackup();
  }

  React.useEffect(() => {
    fetchCopiasSeguridad();
  }, [db]);

  const onRestoreBackup = (value) => {
    restoreBackup({ db, fileName: value });
  }

  return (
    <Layout title="Copias de seguridad" user={user}>
      <h2>{db}</h2>
      {restoreMessage && <Message message={restoreMessage} fileName={fileName} />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Button label="Realizar backup" onClick={backup} />
      {copiasSeguridad?.length > 0 && <BackupList list={copiasSeguridad} user={user} onRestoreBackup={onRestoreBackup} />}
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  return await customServerSideHoc(ctx);
}

export default CopiasSeguridad;
