import React from 'react';
import { useModal } from '../../customHooks/useModal';
import usePlanCuentas from '../../customHooks/usePlanCuentas';
import Button from '../Button/Button.component';
import List from '../List/List.component';
import { HelperCuentaDiv } from './HelperCuenta.styled';

const HelperCuenta = ({ db, user }) => {
  const { modal, setBody, toggle } = useModal(<h1>asdasd</h1>);
  const [showList, setShowList] = React.useState(false);
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
    <HelperCuentaDiv>
      <Button label="Mostrar cuentas" onClick={toggle} />
      {showList && planesCuentas.map(plan => (<div>{plan.Nombre}</div>))}
      {modal}
    </HelperCuentaDiv>
  )
}

export default HelperCuenta
