import { query } from '../../../../lib/db';

const getMayorCuenta = async ({ db, idPlanCuenta, FechaHasta }) => {
  let whereClouse = `WHERE diario_mayor.idPlanCuenta = '${idPlanCuenta}'`;
  if (FechaHasta) {
    whereClouse += `AND Fecha <= '${FechaHasta}'`;
  }
  const queryString = `
      SELECT DISTINCT 
        plan_cuentas.Nombre AS Plan, 
        DATE_FORMAT(diario_mayor.Fecha, '%d-%m-%Y') AS Fecha, 
        diario_mayor.Numero, 
        diario_mayor.Renglon,
        diario_mayor.Leyenda,
        IF (diario_mayor.DebeHaber = 0, diario_mayor.importe, '') AS Deb,
        IF (diario_mayor.DebeHaber = 1, diario_mayor.importe, '') AS Cred,
        plan_cuentas.CodigoPlan,
        plan_cuentas.idPlanCuenta
      FROM diario_mayor
      INNER JOIN plan_cuentas ON diario_mayor.idPlanCuenta = plan_cuentas.idPlanCuenta
      ${whereClouse}
      ORDER BY diario_mayor.idPlanCuenta ASC,
        diario_mayor.Fecha,
        diario_mayor.TipoAsiento,
        diario_mayor.Numero,
        diario_mayor.DebeHaber,
        diario_mayor.Renglon
    `;
  return await query(queryString, null, db);
};

export default getMayorCuenta;
