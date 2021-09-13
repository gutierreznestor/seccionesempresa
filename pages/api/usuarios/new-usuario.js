import { hash } from 'bcrypt';
import { query } from '../../../lib/db';

const handler = async (req, res) => {
  const { Usuario, Nombre, Apellido, Password, db } = req.body;
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
      db,
    );

    return res.json({
      insertId: results.insertId,
    })
  } catch (e) {
    const message = e.message.includes('ER_DUP_ENTRY') ? `Ya existe el usuario ${Usuario}.` : 'No se pudo agregar el usuario.';
    res.status(400).json({ errorMessage: message })
  }
}

export default handler
