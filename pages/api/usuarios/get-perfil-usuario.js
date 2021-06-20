import { query } from '../../../lib/db'

const handler = async (req, res) => {
  try {
    const { idUsuario, idPerfil } = req.query;
    const results = await query(`
      SELECT idUsuario, idPerfil
      FROM usuarios_tiene_perfiles as up      
      WHERE idUsuario=? AND idPerfil=?
      `,
      [idUsuario, idPerfil],
    );
    return res.json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
