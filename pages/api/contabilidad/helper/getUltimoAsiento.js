import { query } from '../../../../lib/db';

const getUltimoAsiento = async ({ db, id = 1 }) => {
  const results = await query(`
    SELECT UltimoAsiento 
    FROM contabilidad
    WHERE idContabilidad=?
  `, [id], db);
  if (results.length > 0) {
    return results[0].UltimoAsiento;
  }
  return null;
};

export default getUltimoAsiento;
