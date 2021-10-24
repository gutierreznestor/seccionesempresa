import { query } from '../../../../lib/db';

const getTitulosBalance = async ({ db }) => {
  const cuentas = await query(`
    SELECT 
      plan_cuentas.idPlanCuenta, 
      plan_cuentas.CodigoPlan, 
      plan_cuentas.Nombre
    FROM plan_cuentas
    WHERE plan_cuentas.Tipo = 0
    ORDER BY plan_cuentas.CodigoPlan DESC
    `, null, db);
  return cuentas;
};

export default getTitulosBalance;
