import { query } from '../../../lib/db';

const handler = async (req, res) => {
  try {
    const { db, Numero } = req.query;
    const results = await query(`
      SELECT DISTINCT asientos.Numero AS id, asientos.Numero, asientos.Renglon, asientos.idPlanCuenta
      FROM asientos      
      WHERE Numero = ?
      ORDER BY asientos.Renglon ASC
      `,
      [Numero],
      db,
    );
    if (results.length === 0) {
      return res.status(200).send({
        Numero,
        Renglon: 1,
      });
    }
    const lastElement = results[results.length - 1];
    const Renglon = lastElement.Renglon + 1;
    res.status(200).send({
      Numero,
      Renglon,
    });
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
