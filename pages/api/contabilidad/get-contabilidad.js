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
    if (results.length === 0) {
      return res.status(404).send('No se encontraron datos.');
    }
    const data = results[0];
    const Proximo = data.UltimoAsiento + 1;
    data.Proximo = Proximo;
    return res.status(200).json(data)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
