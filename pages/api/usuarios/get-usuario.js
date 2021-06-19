import { query } from '../../../lib/db'

const handler = async (req, res) => {
  try {
    const { id } = req.query;
    const results = await query(`
      SELECT DISTINCT usuarios.Nombre, usuarios.Apellido, usuarios.Usuario
      FROM usuarios      
      WHERE usuarios.idUsuario=?
      `,
      [id],
    );
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
