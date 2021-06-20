import { query } from '../../../lib/db'

const handler = async (_, res) => {
  try {
    const results = await query(`
    SELECT DISTINCT lu.idLogUsuario, lu.Creado, usuarios.Usuario,
      usuarios.idUsuario, lu.Operacion, lu.Descripcion
    FROM logs_usuarios AS lu
    INNER JOIN usuarios ON (usuarios.idUsuario = lu.idUsuario)
    `);

    return res.json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
