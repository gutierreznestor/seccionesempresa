import { query } from '../../../lib/db'

const handler = async (_, res) => {
  try {
    const results = await query(`
    SELECT DISTINCT lp.idLogPerfil, lp.Creado, usuarios.Usuario,
      usuarios.idUsuario, lp.Operacion, lp.Descripcion
    FROM logs_perfiles AS lp
    INNER JOIN usuarios ON (usuarios.idUsuario = lp.idUsuario)
    ORDER BY lp.idLogPerfil DESC
    `);

    return res.json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
