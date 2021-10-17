import { query } from '../../../lib/db';
import getSumDebeHaber from './helper/getSumDebeHaber';

const converToUi = (results) => {
  let hash = results.reduce((acc, curr, index) => {
    const Numero = curr.Numero;
    if (!acc[Numero]) {
      acc[Numero] = {
        Numero,
        Renglones: []
      }
    }
    const newRenglones = acc[Numero].Renglones;
    newRenglones.push({ Cant: index + 1, ...curr });
    acc[Numero] = {
      Numero: curr.Numero,
      Fecha: curr.Fecha,
      Renglones: newRenglones,
    }
    return acc;
  }, {});
  const keys = Object.keys(hash);
  const libro = keys.map((key) => {
    return hash[key];
  });
  return libro;
}

const handler = async (req, res) => {
  try {
    const { db, Fecha } = req.query;
    let whereClouse = '';
    if (Fecha) {
      whereClouse = `WHERE diario_mayor.Fecha <= '${Fecha}'`;
    }
    const queryString = `
      SELECT DISTINCT 
        plan_cuentas.Nombre AS Plan, 
        DATE_FORMAT(diario_mayor.Fecha, '%d-%m-%Y') AS Fecha, 
        diario_mayor.Numero, 
        diario_mayor.Renglon,
        diario_mayor.Leyenda,
        IF (diario_mayor.DebeHaber = 0, diario_mayor.importe, '') AS Debe,
        IF (diario_mayor.DebeHaber = 1, diario_mayor.importe, '') AS Haber
      FROM diario_mayor
      INNER JOIN plan_cuentas ON diario_mayor.idPlanCuenta = plan_cuentas.idPlanCuenta
      ${whereClouse}
      ORDER BY 
        diario_mayor.Fecha,
        diario_mayor.TipoAsiento,
        diario_mayor.Numero,
        diario_mayor.DebeHaber,
        diario_mayor.Renglon
    `;
    const results = await query(queryString, null, db);
    const apiToUi = converToUi(results);
    const { TotalDebe, TotalHaber } = await getSumDebeHaber({ db, FechaHasta: Fecha });
    return res.status(200).json({ asientos: apiToUi, TotalDebe, TotalHaber });
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler;
