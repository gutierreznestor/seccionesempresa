import { query } from '../../../lib/db'

const handler = async (req, res) => {
  try {
    const { db, id = 1 } = req.query;
    const results = await query(`
      SELECT idContabilidad, NombreEmpresa, AperturaEjercicio, CierreEjercicio, 
        UltimaEmisionLibroDiario, UltimoAsiento 
      FROM contabilidad
      WHERE idContabilidad=?
      `,
      [id],
      db,
    );
    return res.json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
