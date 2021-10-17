import { query } from '../../../../lib/db';

const getSumDebeHaber = async ({ db, FechaHasta }) => {
  const results = await query(`
  SELECT DISTINCT
    plan_cuentas.Nombre AS Plan,
    DATE_FORMAT(diario_mayor.Fecha, '%d-%m-%Y') AS Fecha,  
    diario_mayor.Numero,        
    diario_mayor.Leyenda,
    SUM(IF (diario_mayor.DebeHaber = 0, diario_mayor.importe, 0)) AS TotalDebe,
    SUM(IF (diario_mayor.DebeHaber = 1, diario_mayor.importe, 0)) AS TotalHaber
  FROM diario_mayor
  INNER JOIN plan_cuentas ON diario_mayor.idPlanCuenta = plan_cuentas.idPlanCuenta
  WHERE diario_mayor.Fecha <= ?
  `, [FechaHasta], db);

  if (results.length == 0) {
    return {
      TotalDebe: 0,
      TotalHaber: 0,
    };
  }
  return {
    TotalDebe: results[0].TotalDebe,
    TotalHaber: results[0].TotalHaber,
  }
};

export default getSumDebeHaber;
