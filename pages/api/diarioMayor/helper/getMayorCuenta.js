import { query } from '../../../../lib/db';
import getPlanCuenta from '../../plan-cuentas/helpers/getPlanCuenta';
import { newDecimal } from '../../../../helpers/decimalNumbers';

const toSaldo = (prev, curr) => {
  let Debe = newDecimal(curr.Deb ? curr.Deb : 0);
  let Haber = newDecimal(curr.Cred ? curr.Cred : 0);
  let newSaldo = 0;
  if (prev.length === 0) {
    let PrevSaldo = 0;
    if (curr.Saldo) {
      PrevSaldo = newDecimal(curr.Saldo);
    }
    newSaldo = PrevSaldo + Debe - Haber;
    prev.push({
      ...curr,
      Saldo: newSaldo,
    });
  } else {
    const last = prev[prev.length - 1];
    newSaldo = newDecimal(last.Saldo + Debe - Haber);
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

const getMayorCuenta = async ({ db, idPlanCuenta, FechaDesde, FechaHasta, Saldo = 0 }) => {
  let whereClouse = `WHERE diario_mayor.idPlanCuenta = '${idPlanCuenta}'`;
  if (FechaHasta) {
    whereClouse += ` AND Fecha <= '${FechaHasta}'`;
  }
  if (FechaDesde) {
    whereClouse += ` AND Fecha >= '${FechaDesde}'`;
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
  let registros = await query(queryString, null, db);
  if (Saldo) {
    registros.unshift({
      Asiento: '',
      Renglón: '',
      Fecha: '',
      FechaV: '',
      Comprobante: '',
      Leyenda: 'SALDO ANTERIOR',
      Deb: '',
      Cred: '',
      Saldo,
    });
  }
  const asientos = calcularBalance(registros);
  let saldo = 0;
  if (asientos.length) {
    saldo = asientos[asientos.length - 1].Saldo;
  }
  if (asientos.length === 1) {
    asientos.push({
      Asiento: '',
      Renglón: '',
      Fecha: '',
      FechaV: '',
      Comprobante: '',
      Leyenda: 'SIN MOVIMIENTOS',
      Deb: '',
      Cred: '',
    });
  }
  return {
    cuenta,
    asientos,
    saldo,
  }
};

export default getMayorCuenta;
