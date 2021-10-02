import { query } from '../../../../lib/db';

const getAsientosByNumero = async ({ db, Numero }) => {
  const results = await query(`
      SELECT DISTINCT 
        asientos.Numero, 
        asientos.Comprobante, 
        asientos.Renglon,
        asientos.Leyenda,
        asientos.idPlanCuenta,
        asientos.Fecha,
        asientos.FechaVencimiento,
        asientos.FechaOperacion,
        asientos.TipoAsiento,
        asientos.DebeHaber,
        DATE_FORMAT(asientos.Fecha, '%d-%m-%Y') AS Fecha,
        plan_cuentas.Nombre AS Plan,
        asientos.importe AS Importe
      FROM asientos
      INNER JOIN plan_cuentas ON asientos.idPlanCuenta = plan_cuentas.idPlanCuenta
      WHERE asientos.Numero = ?
      ORDER BY Renglon ASC
    `, [Numero], db);
  return results;
};

export default getAsientosByNumero;
