import { query } from '../../../lib/db'

const handler = async (req, res) => {
  try {
    const { id, db } = req.query;
    const results = await query(`
      SELECT DISTINCT usuarios.Nombre, usuarios.Apellido, usuarios.Usuario
      FROM usuarios      
      WHERE usuarios.idUsuario=?
      `,
      [id],
      db
    );
    return res.status(200).json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
