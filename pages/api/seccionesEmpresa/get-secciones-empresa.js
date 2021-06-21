import { authenticated } from '../../../hocs/auth'
import { query } from '../../../lib/db'

const handler = async (_, res) => {
  try {
    const results = await query(`
      SELECT * FROM secciones_empresa
      ORDER BY idSeccionEmpresa
  `)

    return res.json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default authenticated(
  handler,
  ['supervisor', 'admin', 'auditor'],
);
