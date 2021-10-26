import getPlanesCuenta from './helper/getPlanesCuenta';
import getBalanceHasta from './helper/getBalanceHasta';
import { formatDate, getPreviousDate } from '../../../helpers/dates';
import getBalanceCierreHasta from './helper/getBalanceCierreHasta';

const convertToModel = (balanceObj) => {
  const keys = Object.keys(balanceObj);
  const sorted = keys.sort((a, b) => {
    return a.localeCompare(b);
  });
  const list = sorted.map(key => {
    delete balanceObj[key].Tipo;
    return balanceObj[key];
  });
  return list;
}

const handler = async (req, res) => {
  try {
    const { db, FechaDesde, FechaHasta } = req.query;
    const planes = await getPlanesCuenta({ db });
    let balanceHash = {};
    if (FechaDesde) {
      const previoudDay = getPreviousDate(FechaDesde);
      const hashSaldoCierre = await getBalanceCierreHasta({
        planes,
        db,
        FechaHasta: formatDate({ date: previoudDay, formatString: 'yyyy-MM-dd' }),
        SaldoInicial: 0,
      });
      const hashBD = await getBalanceHasta({
        planes,
        db,
        FechaDesde,
        FechaHasta,
        hashSaldoInicial: hashSaldoCierre,
      });
      balanceHash = convertToModel(hashBD);
    } else {
      const hashBH = await getBalanceHasta({
        planes,
        db,
        FechaHasta,
      });
      balanceHash = convertToModel(hashBH);
    }
    return res.status(200).json(balanceHash);
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler;
