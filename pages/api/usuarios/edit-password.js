import { query } from '../../../lib/db'

const handler = async (req, res) => {
  const { id } = req.query;
  const { Password } = req.body;
  try {
    if (!Password) {
      return res
        .status(400)
        .json({ message: 'Se requiere el Password en el cuerpo de la llamada.' })
    }
    const results = await query(
      `
      UPDATE usuarios
      SET Password = ?
      WHERE idUsuario= ?
      `,
      [Password, id],
    )

    return res.json(results)
  } catch (e) {
    res.status(400).json({ message: 'No se pudo editar el password.' })
  }
}

export default handler
