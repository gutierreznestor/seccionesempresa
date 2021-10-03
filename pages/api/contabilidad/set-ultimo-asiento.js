import { query } from '../../../lib/db'
import getUltimoAsiento from './helper/getUltimoAsiento';

const handler = async (req, res) => {
  const { db, id = 1, Numero = 1, Renglon } = req.body;
  const {
  } = req.body;
  try {
    const ultimoAsiento = await getUltimoAsiento({ db, id });
    if (Numero <= ultimoAsiento || Renglon != 1) {
      return res.status(400).json({
        errorMessage: 'No se actualizó el último asiento.',
      });
    };
    const results = await query(
      `
      UPDATE contabilidad
        SET UltimoAsiento = ?
      WHERE idContabilidad = ?
      `,
      [
        Numero,
        id,
      ],
      db,
    );
    return res.status(200).json(results);
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
