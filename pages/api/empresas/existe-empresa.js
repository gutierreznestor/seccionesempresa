import { query } from '../../../lib/db'

const handler = async (req, res) => {
  try {
    const { empresa } = req.query;
    const results = await query(`
      SELECT *
      FROM empresas
      WHERE empresas.Nombre=?
      `,
      [empresa],
      'mainseccionesempresa'
    );
    return res.json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
