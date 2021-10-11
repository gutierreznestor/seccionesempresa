import { formatDate } from '../helpers/dates';

export const getNextAsientoRef = ({
  Fecha,
  Leyenda,
  Numero,
  Renglon,
  TipoAsiento,
  path = 'new',
}) => {
  let nuevoAsientoRef = `/contabilidad/asientos/${path}`;
  if (Numero && Renglon) {
    nuevoAsientoRef = nuevoAsientoRef + `?Numero=${new Number(Numero)}&Renglon=${new Number(Renglon) + 1}`;
    nuevoAsientoRef = nuevoAsientoRef + `&Fecha=${formatDate({ date: Fecha, formatString: 'MM/dd/yyyy', })}`;
    nuevoAsientoRef = nuevoAsientoRef + `&Leyenda=${Leyenda}&TipoAsiento=${TipoAsiento}`;
  }
  return nuevoAsientoRef;
}