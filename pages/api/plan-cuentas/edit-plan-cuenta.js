import { query } from '../../../lib/db';
import getParent from './getParent';

const handler = async (req, res) => {
  const { id } = req.query;
  const { CodigoPlan, Nombre, db, Tipo } = req.body;
  try {
    if (!CodigoPlan) {
      return res
        .status(400)
        .json({ errorMessage: 'Complete todos los campos.' })
    }
    const parent = await getParent({ db, CodigoPlan });
    if (parent.errorMessage) {
      return res.status(400).json({
        errorMessage: 'El plan de cuentas padre no existe'
      });
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
