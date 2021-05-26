import { query } from '../../../lib/db'

const handler = async (req, res) => {
  const { idSeccionEmpresa } = req.body
  try {
    if (!idSeccionEmpresa) {
      return res
        .status(400)
        .json({ message: 'Se requiere el id de la sección de empresa.' })
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
    res.status(500).json({ message: e.message })
  }
}

export default handler
