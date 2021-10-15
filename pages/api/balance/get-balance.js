import getCuentasBalance from './helper/getCuentasBalance';
import getBalance from './helper/getBalance';
import getSaldoInicial from './helper/getSaldoInicial';
// import getBalanceDesde from './helper/getBalanceDesde';

const convertToModel = (balanceObj) => {
  const keys = Object.keys(balanceObj);
  const sorted = keys.sort((a, b) => {
    return a.localeCompare(b);
  });
  const list = sorted.map(key => {
    const obj = {};
    obj.CodigoPlan = key;
    obj.balance = balanceObj[key];
    return balanceObj[key];
  });
  return list;
}

const initializeBalanceHash = (list) => {
  const hash = {};
  list.forEach(item => {
    hash[item.CodigoPlan] = {
      ...item,
      SaldoInicial: 0,
      Debitos: 0,
      Creditos: 0,
      Acumulado: 0,
      SaldoCierre: 0,
    };
  });
  return hash;
}

const saldoInicialCuentas = async ({ db, cuentas = [], balanceHash }) => {
  let hash = balanceHash;
  for (const cuenta of cuentas) {
    const saldoHash = await getSaldoInicial({ db, idPlanCuenta: cuenta.idPlanCuenta, balanceHash: hash });
    hash = { ...hash, ...saldoHash };
  }
  return hash;
}

const handler = async (req, res) => {
  try {
    const { db, FechaDesde, FechaHasta } = req.query;
    const cuentas = await getCuentasBalance({ db });
    let balanceHash = initializeBalanceHash(cuentas);
    const hashSaldoInicial = await saldoInicialCuentas({ db, cuentas, balanceHash });
    let hash = { ...hashSaldoInicial };
    if (cuentas.length) {
      for (const cuenta of cuentas) {
        const res = await getBalance({
          idPlanCuenta: cuenta.idPlanCuenta,
          db,
          FechaHasta,
          balanceHash: hash,
          Saldo: hashSaldoInicial[cuenta.CodigoPlan].SaldoInicial,
        });
        hash = { ...hash, ...res };
      }
    }
    const balance = convertToModel(hash);
    return res.status(200).json(balance)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler;
