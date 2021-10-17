import { query } from '../../../lib/db';
import getSumDebeHaber from './helper/getSumDebeHaber';

const handler = async (req, res) => {
  try {
    const { db, Fecha, id = 1 } = req.query;
    await query(
      `
      UPDATE contabilidad
        SET UltimaEmisionLibroDiario = ?
      WHERE idContabilidad = ?
      `,
      [
        Fecha,
        id,
      ],
      db,
    );
    return res.status(200).json({ message: 'Libro diario registrado correctamente.' });
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler;
