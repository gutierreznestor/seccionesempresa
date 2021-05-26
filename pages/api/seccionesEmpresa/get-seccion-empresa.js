import { query } from '../../../lib/db'

const handler = async (req, res) => {
  try {
    const { id } = req.query;
    const results = await query(`
      SELECT Nombre, Descripcion 
      FROM secciones_empresa
      WHERE idSeccionEmpresa=${id}
    `);
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
