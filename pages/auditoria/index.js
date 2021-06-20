import React from 'react';

import Layout from '../../components/Layout';
import LogsUsuariosList from '../../components/LogsUsuariosList/LogsUsuariosList.component';

const Auditoria = () => {
  return (
    <Layout title="Auditoría">
      <LogsUsuariosList list={[]} />
    </Layout>
  )
}

export default Auditoria;
