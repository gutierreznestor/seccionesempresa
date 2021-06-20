import { query } from '../../../lib/db'

const handler = async (_, res) => {
  try {
    const results = await query(`
    SELECT DISTINCT lse.idLogUsuario, lse.Creado, usuarios.Usuario,
      usuarios.idUsuario, lse.Operacion, lse.Descripcion
    FROM logs_secciones_empresa AS lse
    INNER JOIN usuarios ON (usuarios.idUsuario = lse.idUsuario)
    ORDER BY lse.idLogUsuario DESC
    `);

    return res.json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
