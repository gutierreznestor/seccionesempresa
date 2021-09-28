import { query } from '../../../lib/db';
import getNivel from './helpers/getNivel';
import getParent from './helpers/getParent';

const handler = async (req, res) => {
  const { CodigoPlan, Nombre, db, Tipo } = req.body;
  if (!Nombre || !Tipo || !CodigoPlan) {
    return res
      .status(400)
      .json({ errorMessage: 'Complete todos los campos.' })
  }
  const nivel = getNivel(CodigoPlan);

  if (nivel > 1) {
    const parent = await getParent({ db, CodigoPlan });
    if (parent.errorMessage) {
      return res.status(400).json({
        errorMessage: 'El plan de cuentas padre no existe'
      });
    }
  }
  try {

    const results = await query(
      `
      INSERT INTO plan_cuentas (CodigoPlan, Nivel, Nombre, Tipo) 
      VALUES (?,?,?,?)
      `,
      [CodigoPlan, nivel, Nombre, Tipo],
      db,
    )

    return res.status(201).json(results)
  } catch (e) {
    const message = e.message.includes('ER_DUP_ENTRY') ?
      `Ya existe una cuenta con el código ${CodigoPlan}` :
      'No se pudo agregar la cuenta.';
    res.status(400).json({ errorMessage: message })
  }
}

export default handler
