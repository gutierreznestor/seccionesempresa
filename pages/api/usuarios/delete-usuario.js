import { query } from '../../../lib/db'

const handler = async (req, res) => {
  const { id: idUsuario, db } = req.body;
  try {
    if (!idUsuario) {
      return res
        .status(400)
        .json({ errorMessage: 'Se requiere el id del usuario.' })
    }
    const results = await query(
      `
      DELETE FROM usuarios
      WHERE idUsuario=?
      `,
      [idUsuario],
      db,
    )

    return res.json(results)
  } catch (e) {
    const message = e.message.includes('ER_ROW_IS_REFERENCED_2') ? `Elimine los perfiles asociados antes de eliminar al usuario.` : 'No se pudo eliminar el usuario.';
    res.status(400).json({ errorMessage: message })
  }
}

export default handler
