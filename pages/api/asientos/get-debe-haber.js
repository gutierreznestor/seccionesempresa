import { query } from '../../../lib/db'

const handler = async (req, res) => {
  try {
    const { db, Numero } = req.query;
    const results = await query(`
    SELECT 
      SUM(IF(asientos.DebeHaber=0, asientos.importe, 0)) AS Debe,
      SUM(IF(asientos.DebeHaber=1, asientos.importe, 0)) AS Haber
      FROM asientos
    WHERE asientos.Numero=?
      `,
      [Numero],
      db,
    );
    return res.status(200).json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
