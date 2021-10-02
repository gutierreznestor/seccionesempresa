import { query } from '../../../lib/db'

const handler = async (req, res) => {
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
    Renglon,
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

    return res.status(200).json(results)
  } catch (e) {
    res.status(400).json({ errorMessage: e.message })
  }
}

export default handler