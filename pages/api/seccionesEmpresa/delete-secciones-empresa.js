import { query } from '../../../lib/db'

const handler = async (req, res) => {
  const { idSeccionEmpresa } = req.body
  try {
    if (!idSeccionEmpresa) {
      return res
        .status(400)
        .json({ errorMessage: 'Se requiere el id de la sección de empresa.' })
    }
    const results = await query(
      `
      DELETE FROM secciones_empresa 
      WHERE idSeccionEmpresa = ?
      `,
      [idSeccionEmpresa],
    )

    return res.json(results)
  } catch (e) {
    res.status(400).json({ errorMessage: 'No se puede eliminar una sección vinculada a un empleado.' })
  }
}

export default handler
