import { query } from '../../../lib/db'
import isCuenta from './helpers/isCuenta';

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
    if (await isCuenta({ db, idPlanCuenta })) {
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
    }
    res.status(400).json({ errorMessage: 'No se puede agregar un asiento a un título.' })
  } catch (e) {
    res.status(400).json({ errorMessage: e.message })
  }
}

export default handler
