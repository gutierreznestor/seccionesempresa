import { query } from '../../../lib/db'

const handler = async (_, res) => {
  try {
    const results = await query(`
      SELECT DISTINCT idEmpresa, Nombre AS Empresa
      FROM empresas;
    `, null, 'mainSeccionesEmpresa');
    return res.status(200).json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
