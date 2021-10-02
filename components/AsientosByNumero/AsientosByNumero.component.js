import React from 'react';
import useAsientos from '../../customHooks/useAsientos';
import DataTable from '../DataTable/DataTable.component';
import ListItem from '../ListItem';

const Asiento = ({ db }) => {
  const {
    data: { asientosNumero, diferencia },
  } = useAsientos({ db });

  return (
    <div>
      <DataTable data={asientosNumero} />
      <ListItem title="Total Debe" description={diferencia?.Debe} />
      <ListItem title="Total Haber" description={diferencia?.Haber} />
      <ListItem title="Diferencia" description={diferencia?.Diferencia} />
    </div>
  )
}

export default Asiento;
