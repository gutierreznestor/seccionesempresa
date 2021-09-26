import { query } from '../../../lib/db'

const handler = async (req, res) => {
  const { db, id = 1 } = req.query;
  const {
    AperturaEjercicio,
    NombreEmpresa,
    CierreEjercicio,
    UltimaEmisionLibroDiario,
    UltimoAsiento,
  } = req.body;
  console.log({
    AperturaEjercicio,
    NombreEmpresa,
    CierreEjercicio,
    UltimaEmisionLibroDiario,
    UltimoAsiento,
  });
  try {
    const results = await query(
      `
      UPDATE contabilidad
        SET NombreEmpresa = ?, AperturaEjercicio = ?, CierreEjercicio = ?, 
        UltimaEmisionLibroDiario = ?, UltimoAsiento = ?
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
