import { formatDate } from '../helpers/dates';

export const getBalanceRef = ({
  FechaDesde,
  FechaHasta,
}) => {
  let balanceRef = `/contabilidad/balance?FechaHasta=${formatDate({ date: FechaHasta, formatString: 'MM/dd/yyyy', })}`;
  if (FechaDesde) {
    balanceRef += `&FechaDesde=${formatDate({ date: FechaDesde, formatString: 'MM/dd/yyyy', })}`;
  }
  return balanceRef;
};
