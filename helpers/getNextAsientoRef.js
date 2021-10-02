import { formatDate } from '../helpers/dates';

export const getNextAsientoRef = ({ Fecha, Leyenda, Numero, Renglon, TipoAsiento }) => {
  let nuevoAsientoRef = `/contabilidad/asientos/new`;
  if (Numero?.length && Renglon?.length) {
    nuevoAsientoRef = nuevoAsientoRef + `?Numero=${new Number(Numero)}&Renglon=${new Number(Renglon) + 1}&Fecha=${formatDate({ date: Fecha })}&Leyenda=${Leyenda}&TipoAsiento=${TipoAsiento}`;
  }
  return nuevoAsientoRef;
}