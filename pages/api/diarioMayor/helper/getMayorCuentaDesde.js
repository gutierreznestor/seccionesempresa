import { getPreviousDate } from "../../../../helpers/dates";
import getMayorCuenta from "./getMayorCuenta";
import { formatDate } from "../../../../helpers/dates";

const getMayorCuentaDesde = async ({ db, idPlanCuenta, FechaDesde, FechaHasta }) => {
  try {
    const previoudDay = getPreviousDate(FechaDesde);
    const balanceAnterior = await getMayorCuenta({
      db,
      idPlanCuenta,
      FechaHasta: formatDate({ date: previoudDay, formatString: 'yyyy-MM-dd' })
    });
    const mayorCuenta = await getMayorCuenta({
      db,
      FechaDesde: formatDate({ date: FechaDesde, formatString: 'yyyy-MM-dd' }),
      FechaHasta: formatDate({ date: FechaHasta, formatString: 'yyyy-MM-dd' }),
      idPlanCuenta,
      Saldo: balanceAnterior.saldo
    });
    return mayorCuenta;
  } catch (error) {
    console.log(error.message);
  }
};

export default getMayorCuentaDesde;
