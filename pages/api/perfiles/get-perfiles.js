import { query } from '../../../lib/db'

const handler = async (_, res) => {
  try {
    const results = await query(`
      SELECT idPerfil, DATE_FORMAT(Creado, "%d %M %Y") AS Creado, Nombre
      FROM perfiles
      ORDER BY idPerfil
  `)

    return res.json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
