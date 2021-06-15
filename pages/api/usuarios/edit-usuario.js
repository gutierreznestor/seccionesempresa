import { query } from '../../../lib/db'

const handler = async (req, res) => {
  const { id } = req.query;
  const { Nombre, Apellido } = req.body;
  try {
    if (!Nombre) {
      return res
        .status(400)
        .json({ message: 'Se requiere el Nombre en el cuerpo de la llamada.' })
    }
    const results = await query(
      `
      UPDATE usuarios
      SET Nombre = ?, Apellido = ?
      WHERE idUsuario= ?
      `,
      [Nombre, Apellido, id],
    )

    return res.json(results)
  } catch (e) {
    res.status(400).json({ message: 'No se pudo editar el usuario.' })
  }
}

export default handler
