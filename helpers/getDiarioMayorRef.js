import { formatDate } from './dates';

export const getDiarioMayorRef = ({
  FechaDesde,
  FechaHasta,
}) => {
  let balanceRef = `/contabilidad/diario-mayor?FechaHasta=${formatDate({ date: FechaHasta, formatString: 'MM/dd/yyyy', })}`;
  if (FechaDesde) {
    balanceRef += `&FechaDesde=${formatDate({ date: FechaDesde, formatString: 'MM/dd/yyyy', })}`;
  }
  return balanceRef;
};
