import { query } from '../../../lib/db'

const handler = async (req, res) => {
  try {
    const { db } = req.query;
    const results = await query(`
    SELECT DISTINCT lse.idLogSeccionEmpresa AS id, DATE_FORMAT(lse.Creado, "%d/%m/%Y") AS Creado, usuarios.Usuario,
      usuarios.idUsuario, lse.Operacion, lse.Descripcion
    FROM logs_secciones_empresa AS lse
    INNER JOIN usuarios ON (usuarios.idUsuario = lse.idUsuario)
    ORDER BY lse.idLogSeccionEmpresa DESC
    `, null, db);

    return res.status(200).json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
