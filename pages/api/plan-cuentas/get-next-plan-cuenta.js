import getLastChild from './helpers/getLastChild';
import getPlanCuenta from './helpers/getPlanCuenta';
import getNextCodigoPlan from './helpers/getNextCodigoPlan';

const handler = async (req, res) => {
  try {
    const { db, id } = req.query;
    const planCuenta = await getPlanCuenta({ db, id });
    if (!planCuenta) {
      return res
        .status(400)
        .json({ errorMessage: 'El plan de cuenta no existe.' })
    }
    const lastChild = await getLastChild({ db, CodigoPlan: planCuenta.CodigoPlan });
    if (!lastChild) {
      const firstChild = planCuenta.CodigoPlan + '.01';
      return res.status(200).json({ CodigoPlan: firstChild });
    }
    const nextCodigo = await getNextCodigoPlan({ db, CodigoPlan: lastChild.CodigoPlan });
    return res.status(200).json({ CodigoPlan: nextCodigo });
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
