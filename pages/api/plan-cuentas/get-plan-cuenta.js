import { query } from '../../../lib/db'

const handler = async (req, res) => {
  try {
    const { db, id } = req.query;
    const results = await query(`
      SELECT idPlanCuenta AS id, CodigoPlan, Nombre, Nivel, Tipo
      FROM plan_cuentas
      WHERE plan_cuentas.idPlanCuenta = ?
    `, [id], db);
    if (results.length === 0) {
      return res.status(404).send({
        errorMessage: 'No se encontró el plan de cuenta',
      });
    }
    return res.status(200).json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
