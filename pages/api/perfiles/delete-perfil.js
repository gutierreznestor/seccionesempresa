import { query } from '../../../lib/db'

const handler = async (req, res) => {
  const { id } = req.body
  try {
    if (!id) {
      return res
        .status(400)
        .json({ message: 'Se requiere el id del perfil.' })
    }
    const results = await query(
      `
      DELETE FROM perfiles 
      WHERE idPerfil = ?
      `,
      [id],
    )

    return res.json(results)
  } catch (e) {
    res.status(400).json({ message: 'No se puede eliminar un perfil vinculado a un usuario.' })
  }
}

export default handler
