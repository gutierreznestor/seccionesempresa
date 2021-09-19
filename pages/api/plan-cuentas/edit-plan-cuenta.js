import { query } from '../../../lib/db'

const handler = async (req, res) => {
  const { id } = req.query;
  const { CodigoPlan, Nombre, db, Tipo } = req.body;
  try {
    if (!CodigoPlan) {
      return res
        .status(400)
        .json({ errorMessage: 'Se requiere el CodigoPlan.' })
    }
    const results = await query(
      `
      UPDATE plan_cuentas
      SET CodigoPlan = ?, Nombre = ?, Tipo = ?
      WHERE idPlanCuenta = ?
      `,
      [CodigoPlan, Nombre, Tipo, id],
      db,
    );
    return res.json(results)
  } catch (e) {
    res.status(400).json({ errorMessage: e.message })
  }
}

export default handler
