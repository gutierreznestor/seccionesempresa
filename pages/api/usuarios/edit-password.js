import { query } from '../../../lib/db'

const handler = async (req, res) => {
  const { id } = req.query;
  const { Password } = req.body;
  try {
    if (!Password) {
      return res
        .status(400)
        .json({ errorMessage: 'Se requiere el Password.' })
    }
    const results = await query(
      `
      UPDATE usuarios
      SET Password = ?
      WHERE idUsuario= ?
      `,
      [Password, id],
    )

    return res.status(200).json(results)
  } catch (e) {
    res.status(400).json({ errorMessage: 'No se pudo editar el password.' })
  }
}

export default handler
