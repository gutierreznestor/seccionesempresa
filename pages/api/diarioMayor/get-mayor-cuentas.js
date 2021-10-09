import { query } from '../../../lib/db'
import getCuentas from './helper/getCuentas';
import getMayorCuenta from './helper/getMayorCuenta';
import getMayorCuentaDesde from './helper/getMayorCuentaDesde';

const handler = async (req, res) => {
  try {
    const { db, FechaDesde, FechaHasta } = req.query;
    const cuentas = await getCuentas({ db });
    const mayorCuentasPromises = [];
    if (cuentas.length) {
      cuentas.forEach(cuenta => {
        if (FechaDesde) {
          mayorCuentasPromises.push(getMayorCuentaDesde({
            idPlanCuenta: cuenta.idPlanCuenta,
            db,
            FechaDesde,
            FechaHasta,
          }));
        } else {
          mayorCuentasPromises.push(getMayorCuenta({
            idPlanCuenta: cuenta.idPlanCuenta,
            db,
            FechaHasta
          }));
        }
      });
    }
    const mayorCuentas = await Promise.all(mayorCuentasPromises);
    return res.status(200).json(mayorCuentas)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler;
