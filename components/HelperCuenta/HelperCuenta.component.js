import React from 'react';
import { useModal } from '../../customHooks/useModal';
import usePlanCuentas from '../../customHooks/usePlanCuentas';
import Button from '../Button/Button.component';
import List from '../List/List.component';
import { HelperCuentaDiv } from './HelperCuenta.styled';

const HelperCuenta = ({ db, user }) => {
  const { modal, setBody, toggle } = useModal(<h1>asdasd</h1>);
  const {
    data: { planesCuentas },
    handlers: { fetchPlanCuentas },
  } = usePlanCuentas({ db, user });

  React.useEffect(() => {
    fetchPlanCuentas();
  }, []);

  React.useEffect(() => {
    setBody(<List list={planesCuentas} title="Planes de cuentas" />);
  }, [planesCuentas]);

  return (
    <HelperCuentaDiv data-testid='helper-cuenta-div'>
      <Button label="Mostrar cuentas" onClick={toggle} />
      {modal}
    </HelperCuentaDiv>
  )
}

export default HelperCuenta
