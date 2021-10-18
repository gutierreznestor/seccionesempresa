import { formatDate } from '../helpers/dates';

export const getNextAsientoRef = ({
  AddRenglon = false,
  Fecha,
  FechaOperacion,
  FechaVencimiento,
  Leyenda,
  Numero,
  Renglon,
  TipoAsiento,
  path = 'new',
}) => {
  let nuevoAsientoRef = `/contabilidad/asientos/${path}`;
  if (Numero && Renglon) {
    nuevoAsientoRef += `?Numero=${Numero}&Renglon=${AddRenglon ? new Number(Renglon) + 1 : Renglon}`;
  }
  if (Fecha) {
    nuevoAsientoRef += `&Fecha=${formatDate({ date: Fecha, formatString: 'MM/dd/yyyy', })}`;
  }
  if (FechaOperacion) {
    nuevoAsientoRef += `&FechaOperacion=${formatDate({ date: FechaOperacion, formatString: 'MM/dd/yyyy', })}`;
  }
  if (FechaVencimiento) {
    nuevoAsientoRef += `&FechaVencimiento=${formatDate({ date: FechaVencimiento, formatString: 'MM/dd/yyyy', })}`;
  }
  if (Leyenda) {
    nuevoAsientoRef += `&Leyenda=${Leyenda}`;
  }
  if (TipoAsiento) {
    nuevoAsientoRef += `&TipoAsiento=${TipoAsiento}`;
  }
  return nuevoAsientoRef;
}