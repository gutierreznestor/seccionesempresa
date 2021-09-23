import { query } from '../../../lib/db'

const handler = async (req, res) => {
  try {
    const { db } = req.query;
    const results = await query(`
      SELECT DISTINCT asientos.Numero, asientos.Renglon, asientos.idPlanCuenta AS Plan, DATE_FORMAT(asientos.Fecha, '%d-%m-%Y') AS Fecha, 
        DATE_FORMAT(asientos.FechaVencimiento, '%d-%m-%Y') AS FechaV, DATE_FORMAT(asientos.FechaOperacion, '%d-%m-%Y') AS FechaOp, 
        asientos.Comprobante AS Comp, asientos.DebeHaber, asientos.Importe, asientos.Leyenda, asientos.OkCarga AS Carga, asientos.Registrado
      FROM asientos
      ORDER BY Numero DESC
    `, null, db);

    return res.status(200).json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler;
