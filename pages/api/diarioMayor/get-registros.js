import { query } from '../../../lib/db'

const handler = async (req, res) => {
  try {
    const { db } = req.query;
    const results = await query(`
      SELECT DISTINCT 
        diario_mayor.Numero, 
        diario_mayor.Renglon,
        diario_mayor.Leyenda,
        plan_cuentas.Nombre AS Plan, 
        DATE_FORMAT(diario_mayor.Fecha, '%d-%m-%Y') AS Fecha, 
        DATE_FORMAT(diario_mayor.FechaVencimiento, '%d-%m-%Y') AS FechaV, 
        DATE_FORMAT(diario_mayor.FechaOperacion, '%d-%m-%Y') AS FechaOp, 
        IF (diario_mayor.DebeHaber = 0, diario_mayor.importe, '') AS Deb,
        IF (diario_mayor.DebeHaber = 1, diario_mayor.importe, '') AS Cred
      FROM diario_mayor
      INNER JOIN plan_cuentas ON diario_mayor.idPlanCuenta = plan_cuentas.idPlanCuenta
      ORDER BY Numero ASC, Renglon ASC, Plan ASC
    `, null, db);

    return res.status(200).json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler;
