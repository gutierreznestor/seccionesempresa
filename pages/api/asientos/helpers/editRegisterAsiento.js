import { query } from '../../../../lib/db';

const editRegisterAsiento = async ({
  db,
  Numero,
  Registrado,
  Renglon,
}) => {
  try {
    const results = await query(
      `
      UPDATE asientos
      SET Registrado = ?
      WHERE Numero = ? AND Renglon = ?
      `,
      [Registrado, Numero, Renglon],
      db,
    );

    return results;
  } catch (e) {
    return { errorMessage: e.message };
  }
};

export default editRegisterAsiento;
