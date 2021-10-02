import React from 'react';
import useAsientos from '../../customHooks/useAsientos';
import Button from '../Button/Button.component';
import DataTable from '../DataTable/DataTable.component';
import ListItem from '../ListItem';
import { AsientosByNumeroContainer } from './AsientosByNumero.styled';

const Asiento = ({ db }) => {
  const {
    data: { asientosNumero, diferencia },
  } = useAsientos({ db });

  const onRegister = () => {
    console.log('register');
  }

  return (
    <div>
      <DataTable data={asientosNumero} />
      <AsientosByNumeroContainer>
        <div>
          <ListItem title="Total Debe" description={diferencia?.Debe} />
          <ListItem title="Total Haber" description={diferencia?.Haber} />
          <ListItem title="Diferencia" description={diferencia?.Diferencia} />
        </div>
        <div>
          <Button
            label="Registrar"
            disabled={diferencia != 1}
            onClick={onRegister}
          />
        </div>
      </AsientosByNumeroContainer>
    </div>
  )
}

export default Asiento;
