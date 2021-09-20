import getParent from "./getParentString";
import { query } from "../../../../lib/db";

const parent = async ({ db, CodigoPlan }) => {
  const parent = getParent(CodigoPlan);
  const queryString = `
      SELECT * FROM plan_cuentas WHERE CodigoPlan = ?
    `;
  const results = await query(queryString, [parent], db);
  if (results.length === 0) {
    return {
      errorMessage: 'El plan de cuentas padre no existe'
    };
  }
  return results[0];
}

export default parent;
