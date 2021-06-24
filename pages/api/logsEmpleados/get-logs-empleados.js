import { query } from '../../../lib/db'

const handler = async (_, res) => {
  try {
    const results = await query(`
    SELECT DISTINCT le.idLogEmpleado AS id, DATE_FORMAT(le.Creado, "%d/%m/%Y") AS Creado, usuarios.Usuario,
      usuarios.idUsuario, le.Operacion, le.Descripcion
    FROM logs_empleados AS le
    INNER JOIN usuarios ON (usuarios.idUsuario = le.idUsuario)
    ORDER BY le.idLogEmpleado DESC
    `);

    return res.json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
