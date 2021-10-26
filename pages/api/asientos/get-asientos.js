import { query } from '../../../lib/db'

const handler = async (req, res) => {
  try {
    const { db } = req.query;
    const results = await query(`
      SELECT DISTINCT 
        asientos.Numero, 
        asientos.Renglon,
        asientos.Leyenda,
        plan_cuentas.Nombre AS Plan, 
        DATE_FORMAT(asientos.Fecha, '%d-%m-%Y') AS Fecha, 
        DATE_FORMAT(asientos.FechaVencimiento, '%d-%m-%Y') AS FechaV, 
        DATE_FORMAT(asientos.FechaOperacion, '%d-%m-%Y') AS FechaOp, 
        IF (asientos.DebeHaber = 0, TRUNCATE(asientos.importe,2), '') AS Deb,
        IF (asientos.DebeHaber = 1, TRUNCATE(asientos.importe,2), '') AS Cred,
        asientos.Registrado
      FROM asientos
      INNER JOIN plan_cuentas ON asientos.idPlanCuenta = plan_cuentas.idPlanCuenta
      ORDER BY Numero DESC, Renglon DESC, Plan ASC
    `, null, db);

    return res.status(200).json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler;
