import { query } from '../../../../lib/db';

const newRegistro = async ({
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
}) => {
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
  if (results.length > 0) {
    return results[0];
  }
  return null;
};

export default newRegistro;
