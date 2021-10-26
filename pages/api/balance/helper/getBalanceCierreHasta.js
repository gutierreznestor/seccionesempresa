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

const convertToSaldoCierre = (balanceHash) => {
  const keys = Object.keys(balanceHash);
  const hash = {};
  keys.forEach(key => {
    hash[key] = balanceHash[key].SaldoCierre;
  });
  return hash
}

const getBalanceCierreHasta = async ({
  planes,
  db,
  FechaDesde,
  FechaHasta,
}) => {
  let hash = initializeBalanceHash(planes);
  for (const cuenta of planes) {
    if (cuenta.Tipo == 1) {
      const bc = await getBalanceCuenta({
        db,
        cuenta,
        FechaDesde,
        FechaHasta,
        SaldoInicial: 0,
      });
      hash[cuenta.CodigoPlan] = bc;
    } else if (cuenta.Tipo == 0) {
      const bt = await getBalanceTitulo({
        db,
        titulo: cuenta,
        FechaDesde,
        FechaHasta,
        SaldoInicial: 0,
        hash,
      });
      hash[cuenta.CodigoPlan] = bt;
    }
  }
  return convertToSaldoCierre(hash);
};

export default getBalanceCierreHasta;
