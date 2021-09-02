import { query } from '../../../lib/db'

const handler = async (req, res) => {
  const { id: idUsuario, DB } = req.body;
  console.log('req.body: ', req.body);
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
      DB,
    )

    return res.json(results)
  } catch (e) {
    console.log('e: ', e);
    const message = e.message.includes('ER_ROW_IS_REFERENCED_2') ? `Elimine los perfiles asociados antes de eliminar al usuario.` : 'No se pudo eliminar el usuario.';
    res.status(400).json({ errorMessage: message })
  }
}

export default handler
