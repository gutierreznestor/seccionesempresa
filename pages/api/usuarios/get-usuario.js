import { query } from '../../../lib/db'

const handler = async (req, res) => {
  try {
    const { id } = req.query;
    const results = await query(`
      SELECT DISTINCT usuarios.Nombre, usuarios.Apellido, 
        up.idUsuarioPerfil, usuarios.Usuario, perfiles.Nombre AS Perfil 
      FROM usuarios
      LEFT JOIN usuarios_tiene_perfiles AS up ON 
        (up.idUsuario = usuarios.idUsuario)
      LEFT JOIN perfiles ON
        (perfiles.idPerfil = up.idPerfil)
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
