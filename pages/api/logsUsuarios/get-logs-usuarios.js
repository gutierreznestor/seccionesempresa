import { query } from '../../../lib/db'

const handler = async (req, res) => {
  try {
    const { db } = req.query;
    const results = await query(`
    SELECT DISTINCT lu.idLogUsuario AS id, DATE_FORMAT(lu.Creado, "%d/%m/%Y") AS Creado, usuarios.Usuario,
      usuarios.idUsuario, lu.Operacion, lu.Descripcion
    FROM logs_usuarios AS lu
    INNER JOIN usuarios ON (usuarios.idUsuario = lu.idUsuario)
    ORDER BY lu.idLogUsuario DESC
    `, null, db);

    return res.json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
