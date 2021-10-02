import { query } from '../../../lib/db'

const handler = async (req, res) => {
  try {
    const { db, Numero, Renglon } = req.query;
    const results = await query(`
      SELECT DISTINCT 
        asientos.Numero AS id, 
        asientos.Numero, 
        asientos.Renglon, 
        asientos.idPlanCuenta, 
        asientos.Fecha, 
        asientos.FechaVencimiento, 
        asientos.FechaOperacion, 
        asientos.Comprobante, 
        asientos.DebeHaber,
        asientos.Importe, 
        asientos.Leyenda, 
        asientos.OkCarga AS Carga, 
        asientos.Registrado, 
        asientos.TipoAsiento
      FROM asientos      
      WHERE Numero = ? AND Renglon = ?
      `,
      [Numero, Renglon],
      db,
    );
    return res.status(200).json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
