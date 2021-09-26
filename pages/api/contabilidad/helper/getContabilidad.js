import { query } from '../../../../lib/db';

const getContabilidad = async ({ db, id = 1 }) => {
  const results = await query(`
    SELECT idContabilidad, NombreEmpresa, AperturaEjercicio, CierreEjercicio, 
    UltimaEmisionLibroDiario, UltimoAsiento 
    FROM contabilidad
    WHERE idContabilidad=?
  `, [id], db);
  if (results.length > 0) {
    return results[0];
  }
  return null;
};

export default getContabilidad;
