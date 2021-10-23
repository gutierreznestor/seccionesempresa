import { query } from '../../../../lib/db';

const isCuenta = async ({ db, Numero }) => {
  const results = await query(`
    SELECT Tipo
    FROM plan_cuentas
    WHERE plan_cuentas.idPlanCuenta=?  
    `, [Numero], db);
  if (results.length && results[0].Tipo == 1) {
    return true;
  }
  return false;
};

export default isCuenta;
