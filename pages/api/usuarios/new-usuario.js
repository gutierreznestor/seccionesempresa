import { query } from '../../../lib/db'

const handler = async (req, res) => {
  const { Usuario, Nombre, Apellido, Password } = req.body
  try {
    if (!Usuario || !Nombre || !Apellido || !Password) {
      return res
        .status(400)
        .json({ message: 'Complete todos los campos.' })
    }
    const results = await query(
      `
      INSERT INTO usuarios (Usuario. Nombre, Apellido, Password) 
      VALUES (?, ?, ?, ?);
      `,
      [Usuario, Nombre, Apellido, Password],
    );

    return res.json(results)
  } catch (e) {
    res.status(400).json({ message: 'Hubo un error al agregar un usuario.' })
  }
}

export default handler
