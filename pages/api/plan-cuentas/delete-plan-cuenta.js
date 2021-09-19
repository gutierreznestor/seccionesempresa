import { query } from '../../../lib/db'

const handler = async (req, res) => {
  const { id } = req.query;
  const { db } = req.body;
  try {
    if (!id) {
      return res
        .status(400)
        .json({ errorMessage: 'Se requiere el id del plan de cuenta.' })
    }
    const results = await query(
      `
      DELETE FROM plan_cuentas 
      WHERE idPlanCuenta = ?
      `,
      [id],
      db,
    )

    return res.json(results)
  } catch (e) {
    res.status(400).json({ errorMessage: 'No se puede eliminar el plan de cuenta.' })
  }
}

export default handler
