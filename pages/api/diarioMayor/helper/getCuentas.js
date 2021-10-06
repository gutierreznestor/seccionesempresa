import { query } from '../../../../lib/db';

const getCuentas = async ({ db }) => {
  const results = await query(`
    SELECT 
      plan_cuentas.idPlanCuenta,
      plan_cuentas.CodigoPlan,
      plan_cuentas.Nombre
    FROM diario_mayor
    INNER JOIN plan_cuentas ON (plan_cuentas.idPlanCuenta = diario_mayor.idPlanCuenta)
    GROUP BY diario_mayor.idPlanCuenta
    `, null, db);
  return results;
};

export default getCuentas;
