import { query } from '../../../lib/db';
import getNivel from '../../../helpers/getNivel';
import getParent from '../../../helpers/getParent';

const handler = async (req, res) => {
  const { CodigoPlan, Nombre, db, Tipo } = req.body
  const nivel = getNivel(CodigoPlan);
  const parent = getParent(CodigoPlan);
  if (nivel > 1) {
    const queryString = `
      SELECT * FROM plan_cuentas WHERE CodigoPlan = ?
    `;
    const results = await query(queryString, [parent], db);
    if (results.length === 0) {
      return res.status(400).json({
        errorMessage: 'El plan de cuentas padre no existe'
      });
    }
  }
  try {
    if (!Nombre) {
      return res
        .status(400)
        .json({ errorMessage: 'Se requiere el Nombre.' })
    }
    const results = await query(
      `
      INSERT INTO plan_cuentas (CodigoPlan, Nivel, Nombre, Tipo) 
      VALUES (?,?,?,?)
      `,
      [CodigoPlan, nivel, Nombre, Tipo],
      db,
    )

    return res.json(results)
  } catch (e) {
    const message = e.message.includes('ER_DUP_ENTRY') ?
      `Ya existe una cuenta con el código ${CodigoPlan}` :
      'No se pudo agregar la cuenta.';
    res.status(400).json({ errorMessage: message })
  }
}

export default handler
