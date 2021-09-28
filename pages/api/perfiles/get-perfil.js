import { query } from '../../../lib/db'

const handler = async (req, res) => {
  try {
    const { id } = req.query;
    const results = await query(`
      SELECT Nombre 
      FROM perfiles
      WHERE idPerfil=?
      `,
      [id],
    );
    return res.status(200).json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
