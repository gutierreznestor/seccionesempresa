import { query } from '../../../lib/db'

const handler = async (req, res) => {
  const { id } = req.query;
  const { Nombre, Apellido, Usuario } = req.body;
  try {
    if (!Nombre) {
      return res
        .status(400)
        .json({ errorMessage: 'Se requiere el Nombre.' })
    }
    const results = await query(
      `
      UPDATE usuarios
      SET Nombre = ?, Apellido = ?, Usuario = ?
      WHERE idUsuario= ?
      `,
      [Nombre, Apellido, Usuario, id],
    )

    return res.json(results)
  } catch (e) {
    const message = e.message.includes('ER_DUP_ENTRY') ? `Ya existe el usuario ${Usuario}.` : 'No se pudo editar el usuario.';
    res.status(400).json({ errorMessage: message })
  }
}

export default handler
