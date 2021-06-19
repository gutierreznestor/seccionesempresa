import { query } from '../../../lib/db'

const handler = async (req, res) => {
  try {
    const { id } = req.query;
    console.log({ id });
    const results = await query(`
      SELECT perfiles.idPerfil, perfiles.Nombre AS Perfil, IF (usuarios.idUsuario IS NOT NULL, 'Sí', 'No') AS TienePerfil 
      FROM perfiles
      LEFT JOIN usuarios_tiene_perfiles as up ON 
        (up.idPerfil = perfiles.idPerfil)
      LEFT JOIN usuarios ON 
      (usuarios.idUsuario = up.idUsuario AND usuarios.idUsuario=?)
      WHERE 1
      GROUP BY perfiles.idPerfil    
      `,
      [id],
    );
    return res.json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
