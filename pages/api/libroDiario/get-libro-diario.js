import { query } from '../../../lib/db'

const handler = async (req, res) => {
  try {
    const { db, Fecha } = req.query;
    let whereClouse = '';
    if (Fecha) {
      whereClouse = `WHERE Fecha < '${Fecha}'`;
    }
    const queryString = `
      SELECT DISTINCT 
        plan_cuentas.Nombre AS Plan, 
        DATE_FORMAT(diario_mayor.Fecha, '%d-%m-%Y') AS Fecha, 
        diario_mayor.Numero, 
        diario_mayor.Renglon,
        diario_mayor.Leyenda,
        IF (diario_mayor.DebeHaber = 0, diario_mayor.importe, '') AS Deb,
        IF (diario_mayor.DebeHaber = 1, diario_mayor.importe, '') AS Cred
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

    return res.status(200).json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler;
