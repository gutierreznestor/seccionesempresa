import getBalanceCuenta from './getBalanceCuenta';
import getBalanceTitulo from './getBalanceTitulo';

const initializeBalanceHash = (list) => {
  const hash = {};
  list.forEach(item => {
    hash[item.CodigoPlan] = {
      ...item,
      SaldoInicial: 0,
      Debitos: 0,
      Creditos: 0,
      Acumulado: 0,
      SaldoCierre: 0,
    };
  });
  return hash;
}

const getBalanceHasta = async ({
  planes,
  db,
  FechaDesde,
  FechaHasta,
  hashSaldoInicial = {},
}) => {
  let hash = initializeBalanceHash(planes);
  for (const cuenta of planes) {
    if (cuenta.Tipo == 1) {
      const bc = await getBalanceCuenta({
        db,
        cuenta,
        FechaDesde,
        FechaHasta,
        SaldoInicial: hashSaldoInicial[cuenta.CodigoPlan],
      });
      hash[cuenta.CodigoPlan] = bc;
    } else if (cuenta.Tipo == 0) {
      const bt = await getBalanceTitulo({
        db,
        titulo: cuenta,
        FechaDesde,
        FechaHasta,
        SaldoInicial: hashSaldoInicial[cuenta.CodigoPlan],
        hash,
      });
      hash[cuenta.CodigoPlan] = bt;
    }
  }
  return hash;
};

export default getBalanceHasta;
