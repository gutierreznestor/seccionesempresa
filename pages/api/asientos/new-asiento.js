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
    Renglon,
    TipoAsiento,
  } = req.body;
  try {
    if (!db || !DebeHaber || !Fecha || !FechaOperacion || !FechaVencimiento || !idPlanCuenta || !Importe || !Numero || !TipoAsiento) {
      return res
        .status(400)
        .json({ errorMessage: 'Complete todos los campos.' })
    }
    if (await isCuenta({ db, Numero })) {
      const results = await query(
        `
        INSERT INTO asientos (Comprobante, DebeHaber, Fecha, FechaOperacion, FechaVencimiento, 
          idPlanCuenta, Importe, Leyenda, Numero, TipoAsiento, OkCarga, Registrado, Renglon)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `,
        [Comprobante, DebeHaber, Fecha, FechaOperacion, FechaVencimiento, idPlanCuenta, Importe, Leyenda,
          Numero, TipoAsiento, 0, 0, Renglon],
        db,
      )
      return res.status(201).json(results)
    }
    res.status(400).json({ errorMessage: 'No se puede agregar un asiento a un título.' })
  } catch (e) {
    let message = '';
    switch (true) {
      case e.message.includes('ER_DUP_ENTRY'):
        message = 'Ya existe el asiento con el número y renglón ingresado.';
        break;
      case e.message.includes('ER_NO_REFERENCED_ROW_2'):
        message = 'El id de la cuenta no existe';
        break;
      default:
        message = 'Ocurrió un error al intentar guardar el asiento.';
        break;
    }
    res.status(400).json({ errorMessage: message })
  }
}

export default handler
