import { query } from '../../../lib/db'

const handler = async (_, res) => {
  try {
    const results = await query(`
      SELECT idSeccionEmpresa AS id, Nombre
      FROM secciones_empresa
      ORDER BY idSeccionEmpresa DESC
  `)

    return res.json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler;
