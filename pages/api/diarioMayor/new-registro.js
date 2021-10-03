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
    Renglon,
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
      INSERT INTO diario_mayor (Comprobante, DebeHaber, Fecha, FechaOperacion, FechaVencimiento, 
        idPlanCuenta, Importe, Leyenda, Numero, TipoAsiento, OkCarga, Registrado, Renglon)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `,
      [Comprobante, DebeHaber, Fecha, FechaOperacion, FechaVencimiento, idPlanCuenta, Importe, Leyenda,
        Numero, TipoAsiento, 1, 1, Renglon],
      db,
    )

    return res.status(201).json(results)
  } catch (e) {
    let message = '';
    switch (true) {
      case e.message.includes('ER_DUP_ENTRY'):
        message = 'Ya existe el registro con el número y renglón ingresado.';
        break;
      case e.message.includes('ER_NO_REFERENCED_ROW_2'):
        message = 'El id de la cuenta no existe';
        break;
      default:
        message = 'Ocurrió un error al intentar guardar el registro.';
        break;
    }
    res.status(400).json({ errorMessage: message })
  }
}

export default handler
