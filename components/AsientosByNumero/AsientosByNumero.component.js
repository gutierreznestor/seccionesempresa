import React from 'react';
import useAsientos from '../../customHooks/useAsientos';
import useDiarioMayor from '../../customHooks/useDiarioMayor';
import Button from '../Button/Button.component';
import DataTable from '../DataTable/DataTable.component';
import ListItem from '../ListItem';
import { AsientosByNumeroContainer } from './AsientosByNumero.styled';

const columnStyles = {
  '0': { width: '60px', textAlign: 'right' },
  '1': { width: '60px', textAlign: 'right' },
  '2': { width: '250px', textAlign: 'left' },
  '3': { width: '100px', textAlign: 'right' },
  '4': { width: '200px', textAlign: 'left' },
  '5': { width: '60px', textAlign: 'right' },
};

const AsientosByNumero = ({ db }) => {
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
    <div style={{ margin: '10px 0' }}>
      <DataTable columnStyles={columnStyles} data={asientosNumero} />
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

export default AsientosByNumero;
