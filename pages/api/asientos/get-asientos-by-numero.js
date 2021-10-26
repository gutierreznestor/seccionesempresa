import { query } from '../../../lib/db'

const handler = async (req, res) => {
  try {
    const { db, Numero } = req.query;
    if (!Numero) {
      return res
        .status(400)
        .json({ errorMessage: 'Se requiere el Número de asiento.' })
    }
    const results = await query(`
      SELECT DISTINCT 
        asientos.Numero, 
        asientos.Renglon,
        asientos.DebeHaber,
        asientos.Leyenda,
        DATE_FORMAT(asientos.Fecha, '%d-%m-%Y') AS Fecha,
        plan_cuentas.Nombre AS Plan,
        TRUNCATE(asientos.importe,2) AS Importe
      FROM asientos
      INNER JOIN plan_cuentas ON asientos.idPlanCuenta = plan_cuentas.idPlanCuenta
      WHERE asientos.Numero = ?
      ORDER BY Renglon ASC
    `, [Numero], db);

    return res.status(200).json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler;
