import { query } from '../../../../lib/db';

const getPlanCuenta = async ({ db, id }) => {
  const results = await query(`
    SELECT idPlanCuenta AS id, CodigoPlan, Nombre, Nivel, Tipo
    FROM plan_cuentas
    WHERE plan_cuentas.idPlanCuenta = ${id}
  `, null, db);
  if (results.length > 0) {
    return {
      ...results[0],
      SaldoCierre: 0,
      Debitos: 0,
      Creditos: 0,
    };
  }
  return null;
};

export default getPlanCuenta;
