import { query } from '../../../lib/db';
import getChildren from './helpers/getChildren';
import getPlanCuenta from './helpers/getPlanCuenta';

const handler = async (req, res) => {
  const { id } = req.query;
  const { db } = req.body;
  try {
    if (!id) {
      return res
        .status(400)
        .json({ errorMessage: 'Se requiere el id del plan de cuenta.' })
    }
    const planCuenta = await getPlanCuenta({ db, id });
    if (!planCuenta) {
      return res
        .status(400)
        .json({ errorMessage: 'El plan de cuenta no existe.' })
    }
    const children = await getChildren({ db, CodigoPlan: planCuenta.CodigoPlan });
    if (children.length > 0) {
      return res
        .status(400)
        .json({ errorMessage: 'El plan de cuenta tiene hijos.' });
    }

    const results = await query(
      `
      DELETE FROM plan_cuentas 
      WHERE idPlanCuenta = ?
      `,
      [id],
      db,
    )

    return res.status(200).json(results)
  } catch (e) {
    res.status(400).json({ errorMessage: 'No se puede eliminar el plan de cuenta.' })
  }
}

export default handler
