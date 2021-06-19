import { query } from '../../../lib/db'

const handler = async (req, res) => {
  try {
    const { id } = req.query;
    const results = await query(`
      SELECT DISTINCT up.idUsuarioPerfil, usuarios.idUsuario, usuarios.Usuario, 
        perfiles.Nombre AS Perfil, usuarios.Nombre, usuarios.Apellido 
      FROM usuarios
      INNER JOIN usuarios_tiene_perfiles AS up ON 
        (up.idUsuario = usuarios.idUsuario)
      INNER JOIN perfiles ON
        (perfiles.idPerfil = up.idPerfil)
      WHERE usuarios.idUsuario=?
      `,
      [id],
    );
    return res.json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
