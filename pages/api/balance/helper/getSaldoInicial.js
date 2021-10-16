import { query } from '../../../../lib/db';
import getPlanCuenta from '../../plan-cuentas/helpers/getPlanCuenta';

const getSaldoInicial = async ({ db, idPlanCuenta, balanceHash = {} }) => {
  const cuenta = await getPlanCuenta({ db, id: idPlanCuenta });
  let whereClouse = `WHERE diario_mayor.idPlanCuenta = '${idPlanCuenta}' AND 
                      diario_mayor.TipoAsiento=1`;
  const queryString = `
    SELECT DISTINCT 
        plan_cuentas.idPlanCuenta AS Cuenta,
        plan_cuentas.CodigoPlan AS CodigoPlan,
        plan_cuentas.Nombre AS Nombre,
        diario_mayor.TipoAsiento,
        IF (
          diario_mayor.TipoAsiento = 1, 
          IF (diario_mayor.DebeHaber = 0, diario_mayor.importe, -diario_mayor.importe)
          , 0
        ) AS SaldoInicial,
        IF (
          diario_mayor.TipoAsiento = 1, 
          0,
          IF (diario_mayor.DebeHaber = 0, diario_mayor.importe, 0)
        ) AS Debitos,
        IF (
          diario_mayor.TipoAsiento = 1, 
          0,
          IF (diario_mayor.DebeHaber = 1, diario_mayor.importe, 0)
        ) AS Creditos,        
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
      const PrevSaldoInicial = balanceHash[cuenta.CodigoPlan]?.SaldoInicial;
      const SaldoInicial = PrevSaldoInicial + registro.SaldoCierre;
      balanceHash[cuenta.CodigoPlan].SaldoInicial = SaldoInicial;
      const PrevDebitos = balanceHash[cuenta.CodigoPlan]?.Debitos;
      balanceHash[cuenta.CodigoPlan].Debitos = PrevDebitos + registro.Debitos - SaldoInicial;
      if (registro.TipoAsiento == 1) {
        balanceHash[cuenta.CodigoPlan].Debitos = 0;
        balanceHash[cuenta.CodigoPlan].Creditos = 0;
      }
    });
  }
  return balanceHash;
}

export default getSaldoInicial;
