import { hash } from 'bcrypt';
import { query } from '../../../lib/db';

const handler = async (req, res) => {
  const { Usuario, Nombre, Apellido, Password } = req.body;
  try {
    if (!Usuario?.trim() || !Nombre?.trim() || !Apellido?.trim() || !Password?.trim()) {
      return res
        .status(400)
        .json({ errorMessage: 'Complete todos los campos.' })
    }
    const hashPassword = await hash(Password, 10);
    const results = await query(
      `
      INSERT INTO usuarios (Usuario, Nombre, Apellido, Password) 
      VALUES (?, ?, ?, ?);
      `,
      [Usuario, Nombre, Apellido, hashPassword],
    );

    return res.json(results)
  } catch (e) {
    res.status(400).json({ errorMessage: e.message })
  }
}

export default handler
