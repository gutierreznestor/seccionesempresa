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
  } = req.body;
  try {
    if (!db || !DebeHaber || !Fecha || !FechaOperacion || !FechaVencimiento || !idPlanCuenta || !Importe || !Numero || !TipoAsiento) {
      return res
        .status(400)
        .json({ errorMessage: 'Complete todos los campos.' })
    }
    const results = await query(
      `
      INSERT INTO asientos (Comprobante, DebeHaber, Fecha, FechaOperacion, FechaVencimiento, 
        idPlanCuenta, Importe, Leyenda, Numero, TipoAsiento)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `,
      [Comprobante, DebeHaber, Fecha, FechaOperacion, FechaVencimiento, idPlanCuenta, Importe, Leyenda, Numero, TipoAsiento],
      db,
    )

    return res.json(results)
  } catch (e) {
    let message = e.message.includes('ER_NO_REFERENCED_ROW_2') ? `El id de la sección de empresa no existe` : e.message;
    res.status(400).json({ errorMessage: message })
  }
}

export default handler
