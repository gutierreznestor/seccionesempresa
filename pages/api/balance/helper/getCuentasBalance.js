import { query } from '../../../../lib/db';

const getCuentasBalance = async ({ db }) => {
  const cuentas = await query(`
    SELECT 
      plan_cuentas.idPlanCuenta, 
      plan_cuentas.CodigoPlan, 
      plan_cuentas.Nombre
    FROM plan_cuentas
    ORDER BY plan_cuentas.CodigoPlan DESC
    `, null, db);
  return cuentas;
};

export default getCuentasBalance;
