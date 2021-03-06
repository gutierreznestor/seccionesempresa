import { query } from '../../../lib/db'

const handler = async (req, res) => {
  try {
    const { id } = req.query;
    const results = await query(`
      SELECT perfiles.idPerfil, perfiles.Nombre AS Perfil, IF(up.idUsuarioPerfil IS NULL, 'No', 'Sí') AS TienePerfil, up.idUsuario
      FROM perfiles
      LEFT JOIN usuarios_tiene_perfiles as up ON 
        (up.idPerfil = perfiles.idPerfil AND up.idUsuario=?)
      WHERE 1
      GROUP BY perfiles.idPerfil   
      `,
      [id],
    );
    return res.status(200).json(results)
  } catch (e) {
    res.status(400).json({ errorMessage: e.message })
  }
}

export default handler
