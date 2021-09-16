import { query } from '../../../lib/db'

const handler = async (req, res) => {
  try {
    const { db } = req.query;
    const results = await query(`
      SELECT idPlanCuenta AS id, CodigoPlan AS Codigo, Nombre, Nivel, Tipo
      FROM plan_cuentas
      ORDER BY Codigo ASC
  `, null, db)

    res.status(200).json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler;
