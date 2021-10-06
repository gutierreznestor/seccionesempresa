import { query } from '../../../lib/db'
import getCuentas from './helper/getCuentas';
import getMayorCuenta from './helper/getMayorCuenta';

const handler = async (req, res) => {
  try {
    const { db, FechaHasta } = req.query;
    let whereClouse = '';
    if (FechaHasta) {
      whereClouse = `WHERE Fecha <= '${FechaHasta}'`;
    }
    const cuentas = await getCuentas({ db });
    const mayorCuentasPromises = [];
    if (cuentas.length) {
      cuentas.forEach(cuenta => {
        mayorCuentasPromises.push(getMayorCuenta({ idPlanCuenta: cuenta.idPlanCuenta, db, FechaHasta }));
      });
    }
    const mayorCuentas = await Promise.all(mayorCuentasPromises);
    console.log('mayorCuentas: ', mayorCuentas);
    return res.status(200).json(mayorCuentas)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler;
