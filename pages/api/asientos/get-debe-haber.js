import { query } from '../../../lib/db'

const handler = async (req, res) => {
  try {
    const { db, Numero } = req.query;
    const queryString = `
      SELECT 
        SUM(IF(asientos.DebeHaber=0, TRUNCATE(asientos.Importe,2), 0)) AS Debe,
        SUM(IF(asientos.DebeHaber=1, TRUNCATE(asientos.Importe,2), 0)) AS Haber
        FROM asientos
      WHERE asientos.Numero=?`;
    const results = await query(
      queryString,
      [Numero],
      db,
    );
    return res.status(200).json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
