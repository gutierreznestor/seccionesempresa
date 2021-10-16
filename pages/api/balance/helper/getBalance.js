import { query } from '../../../../lib/db';
import getPlanCuenta from '../../plan-cuentas/helpers/getPlanCuenta';
import getChildren from '../../plan-cuentas/helpers/getChildren';

const toSaldo = (prev, curr) => {
  let Debe = Number.parseInt(curr.Deb ? curr.Deb : 0);
  let Haber = Number.parseInt(curr.Cred ? curr.Cred : 0);
  let newSaldo = 0;
  if (prev.length === 0) {
    let PrevSaldo = 0;
    if (curr.Saldo) {
      PrevSaldo = Number.parseInt(curr.Saldo);
    }
    newSaldo = PrevSaldo + Debe - Haber;
    prev.push({
      ...curr,
      Saldo: newSaldo,
    });
  } else {
    const last = prev[prev.length - 1];
    newSaldo = last.Saldo + Debe - Haber;
    prev.push({
      ...curr,
      Saldo: newSaldo,
    });
  }
  return prev;
}

export function calcularBalance(asientos = []) {
  return asientos.reduce(toSaldo, []);
}

const getBalanceCuenta = async ({ db, idPlanCuenta, FechaDesde, FechaHasta, SaldoInicial = 0, balanceHash = {} }) => {
  const cuenta = await getPlanCuenta({ db, id: idPlanCuenta });
  let whereClouse = `WHERE diario_mayor.idPlanCuenta = '${idPlanCuenta}'`;
  if (FechaHasta) {
    whereClouse += ` AND Fecha <= '${FechaHasta}'`;
  }
  if (FechaDesde) {
    whereClouse += ` AND Fecha >= '${FechaDesde}'`;
  }
  const queryString = `
    SELECT DISTINCT 
        plan_cuentas.idPlanCuenta AS Cuenta,
        plan_cuentas.CodigoPlan AS CodigoPlan,
        plan_cuentas.Nombre AS Nombre,
        SUM(IF (diario_mayor.TipoAsiento = 1, 0, IF (diario_mayor.DebeHaber = 0, diario_mayor.importe, 0))) AS Debitos,
        SUM(IF (diario_mayor.TipoAsiento = 1, 0, IF (diario_mayor.DebeHaber = 1, diario_mayor.importe, 0))) AS Creditos,       
        SUM(IF (diario_mayor.DebeHaber = 0, diario_mayor.importe, 0)) - 
          SUM(IF (diario_mayor.DebeHaber = 1, diario_mayor.importe, 0)) AS SaldoCierre
          FROM plan_cuentas
      LEFT JOIN diario_mayor ON diario_mayor.idPlanCuenta = plan_cuentas.idPlanCuenta
      ${whereClouse}
      ORDER BY plan_cuentas.CodigoPlan ASC        
    `;

  let registros = await query(queryString, null, db);
  if (registros.length) {
    registros.forEach(registro => {
      balanceHash[cuenta.CodigoPlan].SaldoInicial = SaldoInicial;
      const PrevDebitos = balanceHash[cuenta.CodigoPlan].Debitos;
      balanceHash[cuenta.CodigoPlan].Debitos = PrevDebitos + registro.Debitos - SaldoInicial;
      const PrevCreditos = balanceHash[cuenta.CodigoPlan].Creditos;
      balanceHash[cuenta.CodigoPlan].Creditos = PrevCreditos + registro.Creditos;
      const Acumulado = balanceHash[cuenta.CodigoPlan].Debitos - balanceHash[cuenta.CodigoPlan].Creditos;
      balanceHash[cuenta.CodigoPlan].Acumulado = Acumulado;
      const PrevCierre = balanceHash[cuenta.CodigoPlan].SaldoCierre;
      balanceHash[cuenta.CodigoPlan].SaldoCierre = PrevCierre + registro.SaldoCierre;
    });
  }
  return balanceHash;
}

const getBalance = async ({ db, idPlanCuenta, FechaDesde, FechaHasta, Saldo = 0, balanceHash = {} }) => {
  const cuenta = await getPlanCuenta({ db, id: idPlanCuenta });
  let hash = { ...balanceHash };
  if (cuenta.Tipo == 1) {
    const response = await getBalanceCuenta({
      db,
      idPlanCuenta,
      FechaDesde,
      FechaHasta,
      Saldo,
      balanceHash,
    });
    hash[cuenta.CodigoPlan] = response[cuenta.CodigoPlan];
    return hash;
  } else {
    const children = await getChildren({ db, CodigoPlan: cuenta.CodigoPlan });
    children.forEach(({ CodigoPlan: ChildCodigoPlan }) => {
      let SaldoCierre = 0;
      let Debitos = 0;
      let Creditos = 0;
      let SInicial = 0;
      if (hash[cuenta.CodigoPlan]) {
        SaldoCierre = hash[cuenta.CodigoPlan].SaldoCierre;
        Debitos = hash[cuenta.CodigoPlan].Debitos;
        Creditos = hash[cuenta.CodigoPlan].Creditos;
        SInicial = hash[cuenta.CodigoPlan].SaldoInicial;
      }
      if (hash[ChildCodigoPlan]) {
        SaldoCierre += hash[ChildCodigoPlan].SaldoCierre;
        Debitos += hash[ChildCodigoPlan].Debitos;
        Creditos += hash[ChildCodigoPlan].Creditos;
        SInicial += hash[ChildCodigoPlan].SaldoInicial;
      }
      hash[cuenta.CodigoPlan].SaldoCierre = SaldoCierre;
      hash[cuenta.CodigoPlan].Debitos = Debitos;
      hash[cuenta.CodigoPlan].Creditos = Creditos;
      hash[cuenta.CodigoPlan].SaldoInicial = SInicial;
      hash[cuenta.CodigoPlan].Acumulado = Debitos - Creditos;
    });
    return hash;
  }
};

export default getBalance;
