import { query } from '../../../lib/db'

const handler = async (req, res) => {
  const { Numero, Renglon } = req.query;
  const {
    Comprobante,
    db,
    DebeHaber,
    Fecha,
    FechaOperacion,
    FechaVencimiento,
    idPlanCuenta,
    Importe,
    Leyenda,
    Numero,
    TipoAsiento,
  } = req.body;
  try {
    if (!Numero || !Renglon) {
      return res
        .status(400)
        .json({ errorMessage: 'Se requiere el Número y Renglón de asiento.' })
    }
    const results = await query(
      `
      UPDATE asientos
      SET Comprobante = ?, DebeHaber = ?, Fecha = ?, FechaOperacion = ?, FechaVencimiento = ?, 
        idPlanCuenta = ?, Importe = ?, Leyenda = ?, Numero = ?, TipoAsiento = ?
      WHERE Numero = ? AND Renglon = ?
      `,
      [Comprobante, DebeHaber, Fecha, FechaOperacion, FechaVencimiento, idPlanCuenta, Importe,
        Leyenda, Numero, TipoAsiento, Numero, Renglon],
      db,
    )

    return res.json(results)
  } catch (e) {
    res.status(400).json({ errorMessage: 'No existe el id de la sección de empresa.' })
  }
}

export default handler
