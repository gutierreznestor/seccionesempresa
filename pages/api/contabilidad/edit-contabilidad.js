import { query } from '../../../lib/db'

const handler = async (req, res) => {
  const { db, id = 1 } = req.query;
  const {
    NombreEmpresa,
    AperturaEjercicio,
    CierreEjercicio,
    UltimaEmisionLibroDiario,
    UltimoAsiento,
  } = req.body;
  try {
    const results = await query(
      `
      UPDATE contabilidad
      SET NombreEmpresa = ?,
      SET AperturaEjercicio = ?,
      SET CierreEjercicio = ?,
      SET UltimaEmisionLibroDiario = ?,
      SET UltimoAsiento = ?
      WHERE idContabilidad = ?
      `,
      [
        NombreEmpresa,
        AperturaEjercicio,
        CierreEjercicio,
        UltimaEmisionLibroDiario,
        UltimoAsiento,
        id,
      ],
      db,
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
