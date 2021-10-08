import { query } from '../../../../lib/db';
import getPlanCuenta from '../../plan-cuentas/helpers/getPlanCuenta';

const toSaldo = (prev, curr) => {
  let Debe = Number.parseInt(curr.Deb ? curr.Deb : 0);
  let Haber = Number.parseInt(curr.Cred ? curr.Cred : 0);
  let newSaldo = 0;
  if (prev.length === 0) {
    newSaldo = Debe - Haber;
    prev.push({
      ...curr,
      Saldo: newSaldo,
    });
  } else {
    const last = prev[prev.length - 1];
    newSaldo = last.Saldo + Debe - Haber;
    prev.push({
      ...curr,
      Saldo: newSaldo,
    });
  }
  return prev;
}

export function calcularBalance(asientos = []) {
  return asientos.reduce(toSaldo, []);
}

const getMayorCuenta = async ({ db, idPlanCuenta, FechaHasta }) => {
  let whereClouse = `WHERE diario_mayor.idPlanCuenta = '${idPlanCuenta}'`;
  if (FechaHasta) {
    whereClouse += `AND Fecha <= '${FechaHasta}'`;
  }
  const cuenta = await getPlanCuenta({ db, id: idPlanCuenta });
  const queryString = `
      SELECT DISTINCT 
        diario_mayor.Numero AS Asiento, 
        diario_mayor.Renglon AS Renglón,
        DATE_FORMAT(diario_mayor.Fecha, '%d-%m-%Y') AS Fecha,
        DATE_FORMAT(diario_mayor.FechaVencimiento, '%d-%m-%Y') AS FechaV,
        diario_mayor.Comprobante,
        diario_mayor.Leyenda,
        IF (diario_mayor.DebeHaber = 0, diario_mayor.importe, '') AS Deb,
        IF (diario_mayor.DebeHaber = 1, diario_mayor.importe, '') AS Cred
      FROM diario_mayor
      INNER JOIN plan_cuentas ON diario_mayor.idPlanCuenta = plan_cuentas.idPlanCuenta
      ${whereClouse}
      ORDER BY diario_mayor.idPlanCuenta ASC,
        diario_mayor.Fecha,
        diario_mayor.TipoAsiento,
        diario_mayor.Numero,
        diario_mayor.DebeHaber,
        diario_mayor.Renglon
    `;
  const registros = await query(queryString, null, db);
  const asientos = calcularBalance(registros);
  let saldo = 0;
  if (asientos.length) {
    saldo = asientos[asientos.length - 1].Saldo;
  }
  return {
    cuenta,
    asientos,
    saldo,
  }
};

export default getMayorCuenta;
