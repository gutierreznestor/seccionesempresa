import { query } from "../../../../lib/db";

const getBalanceCuenta = async ({ db, cuenta, FechaDesde, FechaHasta, SaldoInicial = 0 }) => {
  let whereClouse = `WHERE diario_mayor.idPlanCuenta = '${cuenta.idPlanCuenta}'`;
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
        SUM(IF (diario_mayor.DebeHaber = 0, diario_mayor.importe, 0)) AS Debitos,
        SUM(IF (diario_mayor.DebeHaber = 1, diario_mayor.importe, 0)) AS Creditos
      FROM plan_cuentas
      LEFT JOIN diario_mayor ON diario_mayor.idPlanCuenta = plan_cuentas.idPlanCuenta
      ${whereClouse}
      ORDER BY plan_cuentas.CodigoPlan ASC        
    `;
  let registros = await query(queryString, null, db);
  let debitos = 0;
  let creditos = 0;
  if (registros.length) {
    registros.filter(reg => reg.Cuenta != null).forEach(registro => {
      debitos += registro.Debitos;
      creditos += registro.Creditos;
    });

  }
  cuenta.SaldoInicial = SaldoInicial;
  cuenta.Debitos = debitos;
  cuenta.Creditos = creditos;
  cuenta.Acumulado = debitos - creditos;
  cuenta.SaldoCierre = SaldoInicial + debitos - creditos;
  return cuenta;
}

export default getBalanceCuenta;
