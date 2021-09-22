import getNivel from "./getNivel";
import getParentString from "./getParentString";
import { query } from "../../../../lib/db";

const getChildren = async ({ db, CodigoPlan }) => {
  const nivel = getNivel(CodigoPlan) + 1;
  const queryString = `
      SELECT CodigoPlan, idPlanCuenta, Nivel, Nombre, Tipo
      FROM plan_cuentas 
      WHERE Nivel = ?
    `;
  const results = await query(queryString, [nivel], db);
  const children = [];
  results.forEach((result) => {
    const parent = getParentString(result.CodigoPlan);
    if (parent === CodigoPlan) {
      children.push(result);
    }
  });
  return children;
}

export default getChildren;
