import React from 'react';
import useAsientos from '../../customHooks/useAsientos';
import useDiarioMayor from '../../customHooks/useDiarioMayor';
import Button from '../Button/Button.component';
import DataTable from '../DataTable/DataTable.component';
import ListItem from '../ListItem';
import { AsientosByNumeroContainer } from './AsientosByNumero.styled';

const Asiento = ({ db }) => {
  const {
    data: { asientosNumero, currentAsiento, diferencia },
  } = useAsientos({ db });
  const {
    data: { },
    handlers: { registerAsiento }
  } = useDiarioMayor({ db })

  const onRegister = () => {
    registerAsiento({ Numero: diferencia?.Numero });
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
          {currentAsiento?.Registrado ?
            <strong>Registrado</strong> :
            <Button
              label="Registrar"
              disabled={diferencia?.Diferencia != 0}
              onClick={onRegister}
            />
          }
        </div>
      </AsientosByNumeroContainer>
    </div>
  )
}

export default Asiento;
