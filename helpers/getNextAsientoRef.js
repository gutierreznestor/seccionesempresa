export const getNextAsientoRef = ({ Numero, Renglon }) => {
  let nuevoAsientoRef = `/contabilidad/asientos/new`;
  if (Numero?.length && Renglon?.length) {
    nuevoAsientoRef = nuevoAsientoRef + `?Numero=${new Number(Numero)}&Renglon=${new Number(Renglon) + 1}`;
  }
  return nuevoAsientoRef;
}