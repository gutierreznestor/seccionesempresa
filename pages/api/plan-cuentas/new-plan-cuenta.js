import { query } from '../../../lib/db';
import getNivel from '../../../helpers/getNivel';

const handler = async (req, res) => {
  const { CodigoPlan, Nombre, db, Tipo } = req.body
  const Nivel = getNivel(CodigoPlan);
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
      [CodigoPlan, Nivel, Nombre, Tipo],
      db,
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
