import { query } from '../../../../lib/db';

const getPlanesCuenta = async ({ db, Tipo }) => {
  let whereClause = '';
  if (Tipo) {
    whereClause = `WHERE plan_cuentas.Tipo = '${Tipo}'`;
  }
  const queryString = `
    SELECT 
      plan_cuentas.idPlanCuenta, 
      plan_cuentas.CodigoPlan, 
      plan_cuentas.Nombre,
      plan_cuentas.Tipo
    FROM plan_cuentas
    ${whereClause}
    ORDER BY plan_cuentas.CodigoPlan DESC
  `;
  const cuentas = await query(queryString, null, db);
  return cuentas;
};

export default getPlanesCuenta;
